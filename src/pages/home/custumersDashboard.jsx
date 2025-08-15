import React from "react";

const CustomerDashboard = ({ data }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Customer Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Customers
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {data.total_customers}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            New This Month
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {data.new_customers_this_month}
          </p>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Top Customers
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-gray-500">Name</th>
              <th className="py-2 text-gray-500">Visits</th>
              <th className="py-2 text-gray-500">Total Spent ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.top_customers.map((customer) => (
              <tr
                key={customer.customer_id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2">{customer.name}</td>
                <td className="py-2">{customer.visits}</td>
                <td className="py-2">${customer.total_spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customers by Group */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customers by Group
        </h2>
        <ul className="space-y-2">
          {data.customers_by_group.map((group, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span className="text-gray-700">{group.group}</span>
              <span className="text-gray-900 font-bold">{group.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
