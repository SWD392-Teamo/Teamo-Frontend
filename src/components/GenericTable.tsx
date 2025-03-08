import { dateFormatter } from "@/utils/dateFormatter";
import { Button } from "flowbite-react";
import React from "react";
import MemberAvatar from "./groups/MemberAvatar";

// Define a type for action buttons
type ActionButton = {
  label: string;
  onClick: (id: number) => void;
  className?: string;
};

// Update the props type to include actions
type GenericTableProps<T> = {
  data: T[];
  columns: { header: string; key: keyof T }[];
  actions?: ActionButton[];
};

export default function GenericTable<T>({ 
  data, 
  columns,
  actions 
}: GenericTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-2 border-none bg-transparent text-primary text-left"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={String(column.key)}
                  className={`px-4 py-2 border border-gray-300 bg-gray-50 ${
                    colIndex === 0 ? "border-l" : "border-l-0"
                  } ${colIndex === columns.length - 1 ? "border-r" : "border-r-0"}`}
                >
                  {column.header === "" ? (
                    <MemberAvatar imgUrl={`${String(item[column.key])}`}/>
                  ) : column.header === "Date" ? (
                    dateFormatter(String(item[column.key]))
                  ) : column.header === "Action" && actions ? (
                    <div className="flex flex-row align-middle justify-between gap-3">
                      {actions.map((action, index) => (
                        <Button
                          key={index}
                          className={action.className || "btn btn--primary--outline"}
                          onClick={() => action.onClick(Number(String(item[column.key])))}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    String(item[column.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}