'use client'

import { Application } from '@/types';
import React, { useEffect, useState } from 'react'
import { getFirebaseImageUrl } from '@/lib/firebaseImage';
import { Badge } from 'flowbite-react';
import { dateFormatter } from '@/utils/dateFormatter';
import dynamic from 'next/dynamic'
 
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
})

type Props = {
    application: Application
}

export default function ApplicationDetails({application}: Props) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (application?.imgUrl) {
                const url = await getFirebaseImageUrl(application.imgUrl);
                setImageUrl(url);
            }
        };
        fetchImage();
    }, [application?.imgUrl]);

    if (!application) {
        return <div>Loading...</div>;
    }

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Approved': return 'success';
            case 'Rejected': return 'failure';
            default: return 'warning';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header with Profile */}
            <div className="flex items-center gap-4 pb-4 border-b">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={application.studentName}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                )}
                <div>
                    <h3 className="text-xl font-semibold">{application.studentName}</h3>
                    <p className="text-gray-600">{application.studentEmail}</p>
                </div>
                <Badge color={getStatusColor(application.status)} className="ml-auto">
                    {application.status}
                </Badge>
            </div>
            {/* Application Details */}
            <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-sm font-medium text-primary">To Group</h4>
                        <p className="text-lg">{application.groupName}</p>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-medium text-primary">Position</h4>
                        <p className="text-lg">{application.groupPositionName}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-primary">Request Time</h4>
                        <p className="text-lg">{dateFormatter(application.requestTime)}</p>
                    </div>
                </div>
                {/* Request Content */}
                <div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <pre className="text-lg font-sans whitespace-pre-wrap">
                            {application.requestContent}
                        </pre>
                    </div>
                </div>
                
                {/* Document Viewer */}
                {application.documentUrl && (
                    <div>
                        <h1 className="font-medium text-primary mb-4">Curriculum Vitae</h1>
                        <PDFViewer url={application.documentUrl} />
                    </div>
                )}
            </div>
        </div>
    );
}
