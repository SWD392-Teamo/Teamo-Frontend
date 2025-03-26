import { useMajorStore } from "@/hooks/useMajorStore";
import { Major } from "@/types";
import Link from "next/link";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from "next/image";
import { useMemo } from "react";

const MajorCard: React.FC<{major: Major}> = ({ major }) => {
  const link = `/${major.code}/subjects`;
  const { setSelectedMajor } = useMajorStore();

  // Generate a deterministic gradient based on the major name
  const gradientBackground = useMemo(() => {
    if (major.imgUrl) return undefined;
    
    let hash = 0;
    for (let i = 0; i < major.name.length; i++) {
      hash = major.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const baseHue = 201;
    const baseSat = 77;
    const baseLightness = 59;
    
    const hueVariation = (Math.abs(hash) % 30) - 15;
    const hue1 = (baseHue + hueVariation) % 360;
    const hue2 = (baseHue + hueVariation + 20) % 360; 

    const color1 = `hsl(${hue1}, ${baseSat}%, ${baseLightness}%)`;
    const color2 = `hsl(${hue2}, ${baseSat}%, ${baseLightness - 15}%)`; // Slightly darker
    
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  }, [major.name, major.imgUrl]);

  const handleDetailsClick = () => {
    setSelectedMajor(major);
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition">
      <CardHeader className="p-0">
        <AspectRatio ratio={16/9}>
          {major.imgUrl ? (
            <div className="h-full w-full relative">
              <Image 
                src={major.imgUrl} 
                alt={major.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div 
              className="h-full w-full flex items-center justify-center" 
              style={{ background: gradientBackground }}
            >
              <span className="text-3xl font-bold text-white opacity-80 uppercase">
                {major.code || major.name.substring(0, 3)}
              </span>
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center p-6">
        <h2 className="text-xl font-semibold text-black text-center">{major.name}</h2>
      </CardContent>
      <CardFooter className="pt-0 pb-6 flex justify-center">
        <Link href={link}>
          <button 
            className="px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold" 
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MajorCard;