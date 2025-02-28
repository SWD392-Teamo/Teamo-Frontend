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
            <h3 className="text-2xl font-bold">name</h3>
            <p className="text-gray-600">job</p>
            <p className="text-gray-500">country</p>
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

      {/* View Group Section */}
      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6">View Group</h2>
        <div className="mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mr-2">
            Apply
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-bold">name</h3>
          <p className="text-gray-600">role</p>
          <p className="mt-4 text-gray-700">
            Detail description
          </p>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold">Requirements</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>FE</li>
            <li>BE</li>
            <li>DB</li>
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold">Skills</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Java</li>
            <li>React</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold">Members</h4>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[1, 2, 3, 4].map((member, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <h5 className="text-lg font-semibold">Member Name</h5>
                    <p className="text-sm text-gray-600">Member Role</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Join Group
          </button>
        </div>
      </div>

      <footer className="mt-10 bg-white shadow-md p-6 text-center text-gray-500 text-sm">
        <p>Teamo Copyright © 2024</p>
      </footer>
    </div>
  );
}
