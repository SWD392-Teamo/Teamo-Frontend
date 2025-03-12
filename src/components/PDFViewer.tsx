'use client'

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button } from 'flowbite-react';
import { HiDownload } from 'react-icons/hi';
import { getFirebaseImageUrl } from '@/lib/firebaseImage';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const downloadUrl = await getFirebaseImageUrl(url);
                setPdfUrl(downloadUrl);
            } catch (error) {
                console.error('Error loading PDF:', error);
            }
        };
        loadPdf();
    }, [url]);

    const handleDownload = () => {
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
    };

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }
    
    return (
        <div className="pdf-container">
            <div className="max-h-[600px] overflow-y-auto rounded-lg">
                {pdfUrl && (
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading="Loading PDF..."
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page 
                                key={`page_${index + 1}`}
                                pageNumber={index + 1} 
                                width={600}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ))}
                    </Document>
                )}
            </div>
            <div className="flex justify-end mt-4">
                <Button 
                    onClick={handleDownload}
                    className="btn btn--primary"
                >
                    <div className="btn--icon">
                        <HiDownload size={20}/>
                        <span>Download</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}