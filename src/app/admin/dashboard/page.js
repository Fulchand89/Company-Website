"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";
import { Briefcase, UserCheck, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AdminStatCardSkeleton, AdminListSkeleton } from "@/components/Skeleton";

export default function DashboardPage() {
  const [data, setData] = useState({
    stats: { totalJobs: 0, totalApplications: 0, totalContacts: 0 },
    recentApplications: [],
    recentContacts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) throw new Error("Failed to retrieve dashboard stats.");
        const statsData = await res.json();
        setData(statsData);
      } catch (err) {
        console.error(err);
        setError("Could not load stats. Verify your session.");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time statistics and recent activities overview</p>
      </div>

          {error && (
            <div className="bg-red-950/40 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {loading ? (
            <>
              {/* Stat Cards Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AdminStatCardSkeleton />
                <AdminStatCardSkeleton />
                <AdminStatCardSkeleton />
              </div>

              {/* Recent Activity Grid Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Applications Skeleton */}
                <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white">Recent Applications</h3>
                    <span className="text-gray-500 text-xs">Loading...</span>
                  </div>
                  <AdminListSkeleton count={3} />
                </div>

                {/* Recent Contacts Skeleton */}
                <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white">Recent Contacts</h3>
                    <span className="text-gray-500 text-xs">Loading...</span>
                  </div>
                  <AdminListSkeleton count={3} />
                </div>

              </div>
            </>
          ) : (
            <>
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                  title="Total Job Listings"
                  value={data.stats.totalJobs}
                  icon={<Briefcase className="w-6 h-6" />}
                  description="Open roles posted on careers page"
                />
                <DashboardCard
                  title="Total Job Applications"
                  value={data.stats.totalApplications}
                  icon={<UserCheck className="w-6 h-6" />}
                  description="Resumes received from candidates"
                />
                <DashboardCard
                  title="Contact Messages"
                  value={data.stats.totalContacts}
                  icon={<Mail className="w-6 h-6" />}
                  description="Queries submitted via contact form"
                />
              </div>

              {/* Recent Activity Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Applications */}
                <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Recent Applications</h3>
                    <Link
                      href="/admin/applications"
                      className="text-red-500 hover:text-red-400 text-xs font-semibold flex items-center gap-1"
                    >
                      View All <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {data.recentApplications.length > 0 ? (
                      data.recentApplications.map((app) => (
                        <div key={app.id} className="py-3.5 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-sm text-white">{app.name}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Applied for: {app.position}</p>
                          </div>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {new Date(app.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="py-6 text-center text-gray-500 text-sm">No recent job applications.</p>
                    )}
                  </div>
                </div>

                {/* Recent Contact Messages */}
                <div className="bg-[#161618] border border-gray-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Recent Contacts</h3>
                    <Link
                      href="/admin/contacts"
                      className="text-red-500 hover:text-red-400 text-xs font-semibold flex items-center gap-1"
                    >
                      View All <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {data.recentContacts.length > 0 ? (
                      data.recentContacts.map((contact) => (
                        <div key={contact.id} className="py-3.5 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-sm text-white">{contact.name}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{contact.email}</p>
                          </div>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="py-6 text-center text-gray-500 text-sm">No recent messages.</p>
                    )}
                  </div>
                </div>

              </div>
            </>
          )}
    </div>
  );
}
