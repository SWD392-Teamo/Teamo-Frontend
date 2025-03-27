import { useMajorStore } from "@/hooks/useMajorStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { Subject } from "@/types";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useMemo } from "react";
import Image from "next/image";

const SubjectCard: React.FC<{ subject: Subject }> = ({ subject }) => {
  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  const link = `/${selectedMajor?.code}/${subject.code}/groups`;
  const { setSelectedSubject } = useSubjectStore();

  const gradientBackground = useMemo(() => {
    if (subject.imgUrl) return undefined;
    
    let hash = 0;
    for (let i = 0; i < subject.code.length; i++) {
      hash = subject.code.charCodeAt(i) + ((hash << 5) - hash);
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
  }, [subject.code, subject.imgUrl]);

  const handleDetailsClick = () => {
    setSelectedSubject(subject);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition">
      <CardHeader className="p-0">
        <AspectRatio ratio={16/9}>
          {subject.imgUrl ? (
            <div className="h-full w-full relative">
              <Image 
                src={subject.imgUrl} 
                alt={subject.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div 
              className="h-full w-full flex items-center justify-center" 
              style={{ background: gradientBackground }}
            >
              <span className="text-2xl font-bold text-white opacity-80">
                {subject.code}
              </span>
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">{subject.code}</h2>
          <p className="text-gray-700 italic line-clamp-2">{subject.name}</p>
        </div>
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

export default SubjectCard;
