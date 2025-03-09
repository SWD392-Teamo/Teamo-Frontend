
interface FooterSectionProps {
   title: string;
   contents: string[];
 }
 
const FooterSection: React.FC<FooterSectionProps> = ({ title, contents }) => {
   return (
     <div className="mb-2">
       <h3 className="font-bold text-base">{title}</h3>
       <div className="grid grid-flow-row gap-1 my-1">
         {contents.map((content, index) => (
           <div key={index}><a href="#" className="text-gray-700 hover:underline text-sm">{content}</a></div>
         ))}
       </div>
     </div>
   );
 };

 export default FooterSection;