
interface FooterSectionProps {
   title: string;
   contents: string[];
 }
 
const FooterSection: React.FC<FooterSectionProps> = ({ title, contents }) => {
   return (
     <div className="mb-4">
       <h3 className="font-bold text-lg">{title}</h3>
       <div className="grid grid-flow-row gap-3 my-3">
         {contents.map((content, index) => (
           <div key={index}><a href="#" className="text-gray-700 hover:underline">{content}</a></div>
         ))}
       </div>
     </div>
   );
 };

 export default FooterSection;