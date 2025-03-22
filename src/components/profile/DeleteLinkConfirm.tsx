import { FaExclamationTriangle } from "react-icons/fa";

interface DeleteConfirmationPopupProps {
   isOpen: boolean;
   linkName: string;
   onClose: () => void;
   onConfirmDelete: () => void;
   isDeleting: boolean;
 }
 
 export const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
   isOpen,
   linkName,
   onClose,
   onConfirmDelete,
   isDeleting,
 }) => {
   if (!isOpen) return null;
 
   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
       <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in overflow-hidden">
         <div className="bg-red-50 p-4 border-b border-red-100">
           <div className="flex items-center">
             <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
               <FaExclamationTriangle className="text-red-600 text-lg" />
             </div>
             <h3 className="text-lg font-medium text-red-800">Confirm Delete</h3>
           </div>
         </div>
         
         <div className="p-6">
           <p className="text-gray-700 mb-4">
             Are you sure you want to delete <span className="font-semibold">{linkName || "this link"}</span>? 
             This action cannot be undone.
           </p>
           
           <div className="flex justify-end space-x-3 mt-6">
             <button
               onClick={onClose}
               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
               disabled={isDeleting}
             >
               Cancel
             </button>
             <button
               onClick={onConfirmDelete}
               className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
               disabled={isDeleting}
             >
               {isDeleting ? (
                 <span className="flex items-center">
                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Deleting...
                 </span>
               ) : (
                 "Delete Link"
               )}
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 };