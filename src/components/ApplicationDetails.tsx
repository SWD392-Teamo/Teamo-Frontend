import { Application } from '@/types';
import React from 'react'

type Props = {
    application: Application
}

export default function ApplicationDetails({application}: Props) {
    return (
        <div className="border border-gray-200 rounded-lg shadow-sm p-14 flex flex-col items-start justify-between text-center hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-black">{application.requestContent}</h2>
            <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
            Details
            </button>
        </div>
    );
}
