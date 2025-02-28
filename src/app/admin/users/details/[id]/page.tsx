"use client";

import React from "react";
import AdminNavbar from "@/app/admin/navbar/page";

export default function UserDetails() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6">Profile</h2>
        <div className="flex items-center space-x-6">
          <img
            src="/placeholder-user.jpg"
            alt="User Profile"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <h3 className="text-2xl font-bold">Philip Maya</h3>
            <p className="text-gray-600">UI/UX Designer</p>
            <p className="text-gray-500">Porto, Portugal</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold">About</h4>
          <p className="text-gray-600 text-sm mb-4">
            Updating your information will offer you the most relevant content
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Full Name:</span>
            </p>
            <p>
              <span className="font-medium">Email:</span>
            </p>
            <p>
              <span className="font-medium">Major:</span>
            </p>
            <p>
              <span className="font-medium">Contacts:</span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold">Skills</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Java</li>
            <li>React</li>
            <li>...</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Ban User
          </button>
        </div>
      </div>

      <footer className="mt-10 bg-white shadow-md p-6 text-center text-gray-500 text-sm">
        <p>Teamo Copyright © 2024</p>
      </footer>
    </div>
  );
}
