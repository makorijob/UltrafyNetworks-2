"use client";

import { useState, useEffect } from 'react';
import { 
  Loader2, 
  Check, 
  X, 
  Trash2, 
  Star, 
  Eye, 
  Search, 
  Filter,
  ChevronDown,
  ArrowUpDown,
  Clock,
  User,
  MapPin,
  MessageCircle,
  RefreshCw
} from 'lucide-react';

interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

export default function ReviewAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, statusFilter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      } else {
        setError('Failed to load reviews');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const filterReviews = () => {
    let filtered = reviews;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.area.toLowerCase().includes(term) ||
          r.quote.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }
    
    setFilteredReviews(filtered);
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert('Failed to update review');
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    const labels = {
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getStatusCounts = () => {
    const counts = { all: reviews.length, approved: 0, pending: 0, rejected: 0 };
    reviews.forEach((r) => {
      if (r.status === 'approved') counts.approved++;
      else if (r.status === 'pending') counts.pending++;
      else if (r.status === 'rejected') counts.rejected++;
    });
    return counts;
  };

  const counts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 flex items-center gap-3">
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 w-2 h-10 rounded-full" />
              Review Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage customer reviews and testimonials
            </p>
          </div>
          <button
            onClick={fetchReviews}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total</p>
            <p className="text-3xl font-bold text-blue-950 mt-1">{counts.all}</p>
            <p className="text-xs text-slate-400 mt-1">All reviews</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Approved</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{counts.approved}</p>
            <p className="text-xs text-emerald-500 mt-1">✓ Published</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{counts.pending}</p>
            <p className="text-xs text-amber-500 mt-1">⏳ Awaiting review</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-1">{counts.rejected}</p>
            <p className="text-xs text-red-500 mt-1">✕ Not published</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, area, or review..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 pr-10 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none bg-white text-slate-700 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6 flex items-center gap-2">
            <X className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Reviews Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">No reviews found</h3>
              <p className="text-slate-400 text-sm">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Customer reviews will appear here'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-4 py-4 text-slate-600 font-semibold text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-4 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Area</th>
                    <th className="text-left px-4 py-4 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Review</th>
                    <th className="text-left px-4 py-4 text-slate-600 font-semibold text-xs uppercase tracking-wider">Rating</th>
                    <th className="text-left px-4 py-4 text-slate-600 font-semibold text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-4 text-slate-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-slate-800 font-medium flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            {review.name}
                          </p>
                          <p className="text-xs text-slate-400 sm:hidden mt-0.5">{review.area}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 hidden sm:table-cell">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {review.area}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600 text-sm hidden md:table-cell">
                        <div className="max-w-xs">
                          {review.quote.length > 60 ? (
                            <>
                              {expandedReview === review.id 
                                ? review.quote 
                                : `${review.quote.substring(0, 60)}...`}
                              <button
                                onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                                className="text-emerald-600 hover:text-emerald-700 font-medium text-xs ml-1"
                              >
                                {expandedReview === review.id ? 'Show less' : 'Read more'}
                              </button>
                            </>
                          ) : (
                            review.quote
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400 ml-1">{review.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(review.status)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {review.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(review.id, 'approved')}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(review.id, 'rejected')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteReview(review.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                            className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all duration-200 md:hidden"
                            title="View full review"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Showing {filteredReviews.length} of {reviews.length} reviews
            </span>
            <span>
              Last updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
