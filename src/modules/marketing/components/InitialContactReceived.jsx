


// 'use client';
// import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { getRecentContacts, addContact } from '@/features/marketing/contactSlice';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Label } from '@/components/ui/label';
// import {
//   Loader2,
//   ArrowUpDown,
//   Calendar,
//   AlertCircle,
//   CheckCircle,
//   PlusCircle,
//   X,
//   Users,
//   Filter,
//   Search,
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { format, isWithinInterval, parseISO } from 'date-fns';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar as CalendarComponent } from '@/components/ui/calendar';
// import { toast } from 'sonner';
// import ManualAddContactForm from './ManualAddContactForm';

// export default function InitialContactReceived() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { recentContacts, status } = useSelector((state) => state.contact);

//   const [sortField, setSortField] = useState('fullName');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [filterInquirySource, setFilterInquirySource] = useState('all');
//   const [dateRange, setDateRange] = useState({ from: null, to: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [contactsPerPage, setContactsPerPage] = useState(8);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   // Fetch recent contacts on mount
//   useEffect(() => {
//     dispatch(getRecentContacts());
//   }, [dispatch]);

//   const handleViewContact = (contactId) => {
//     router.push(`/marketing/contacts/${contactId}`);
//   };

//   const resetDateRange = () => {
//     setDateRange({ from: null, to: null });
//   };

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortOrder('asc');
//     }
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [contactsPerPage]);

//   // Unique inquiry sources for filter dropdown
//   const inquirySources = useMemo(() => {
//     const sources = new Set((recentContacts || []).map((c) => c.inquirySource || 'N/A'));
//     return ['all', ...Array.from(sources)];
//   }, [recentContacts]);

//   // Filter and sort recent contacts
//   const filteredAndSortedContacts = useMemo(() => {
//     let result = recentContacts.filter(
//       (contact) => !contact.isDeleted && contact.status === 'Contact Received'
//     );

//     if (filterInquirySource !== 'all') {
//       result = result.filter(
//         (contact) => (contact.inquirySource || 'N/A') === filterInquirySource
//       );
//     }

//     if (dateRange.from && dateRange.to) {
//       result = result.filter((contact) =>
//         contact.createdAt
//           ? isWithinInterval(parseISO(contact.createdAt), {
//               start: dateRange.from,
//               end: dateRange.to,
//             })
//           : false
//       );
//     }

//     result.sort((a, b) => {
//       const fieldA = a[sortField] || '';
//       const fieldB = b[sortField] || '';
//       if (sortField === 'createdAt') {
//         const dateA = fieldA ? parseISO(fieldA) : new Date(0);
//         const dateB = fieldB ? parseISO(fieldB) : new Date(0);
//         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//       }
//       return sortOrder === 'asc'
//         ? String(fieldA).localeCompare(String(fieldB))
//         : String(fieldB).localeCompare(String(fieldA));
//     });

//     return result;
//   }, [recentContacts, sortField, sortOrder, filterInquirySource, dateRange]);

//   const indexOfLastContact = currentPage * contactsPerPage;
//   const indexOfFirstContact = indexOfLastContact - contactsPerPage;
//   const currentContacts = filteredAndSortedContacts.slice(
//     indexOfFirstContact,
//     indexOfLastContact
//   );
//   const totalPages = Math.ceil(filteredAndSortedContacts.length / contactsPerPage);

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleAddContact = (contactData) => {
//     dispatch(addContact(contactData)).then((result) => {
//       if (result.meta.requestStatus === 'fulfilled') {
//         toast.success('Contact added successfully.');
//         dispatch(getRecentContacts());
//         setIsAddModalOpen(false);
//       } else {
//         toast.error('Failed to add contact.');
//       }
//     });
//   };

//   const totalNewContacts = filteredAndSortedContacts.length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         <Card className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-white/20 rounded-xl">
//                   <Users className="h-8 w-8 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-3xl font-bold">New Contact Inquiries</CardTitle>
//                   <p className="text-blue-100 text-sm opacity-90">Manage your recent leads</p>
//                 </div>
//               </div>
//               <Button
//                 className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 shadow-lg transition-all duration-200"
//                 onClick={() => setIsAddModalOpen(true)}
//               >
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Add Contact
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="p-6">
//             {/* Summary Card */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300 border-0">
//                 <CardHeader className="pb-3">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-lg font-semibold text-blue-800 flex items-center space-x-2">
//                       <Users className="h-4 w-4" />
//                       Total New Contacts
//                     </CardTitle>
//                     <div className="p-2 bg-blue-100 rounded-full">
//                       <AlertCircle className="h-4 w-4 text-blue-600" />
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-4xl font-bold text-blue-600">{totalNewContacts}</div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Filters - Compact and Responsive */}
//             <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 bg-white/50 rounded-xl shadow-sm">
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
//                   <Filter className="h-4 w-4" />
//                   <span>Filter by Source</span>
//                 </div>
//                 <Select value={filterInquirySource} onValueChange={setFilterInquirySource}>
//                   <SelectTrigger className="w-full bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200">
//                     <SelectValue placeholder="All Sources" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white border-gray-200">
//                     {inquirySources.map((source) => (
//                       <SelectItem key={source} value={source} className="focus:bg-blue-50">
//                         {source === 'all' ? 'All Sources' : source}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
//                   <Calendar className="h-4 w-4" />
//                   <span>Date Range</span>
//                 </div>
//                 <div className="relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={cn(
//                           "w-full justify-start text-left font-normal bg-white/70 border-gray-200 hover:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 px-3 py-2",
//                           !dateRange.from && "text-muted-foreground"
//                         )}
//                       >
//                         <Calendar className="mr-2 h-4 w-4" />
//                         {dateRange.from && dateRange.to ? (
//                           <span className="truncate max-w-[150px] sm:max-w-none">
//                             {`${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')}`}
//                           </span>
//                         ) : (
//                           <span>Select Date Range</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0 bg-white border-gray-200" align="start">
//                       <CalendarComponent
//                         mode="range"
//                         selected={dateRange}
//                         onSelect={setDateRange}
//                         initialFocus
//                         className="rounded-md border"
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   {dateRange.from && (
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
//                       onClick={resetDateRange}
//                       title="Clear Date Range"
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Contacts Table */}
//             <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
//                     <TableHead
//                       className="cursor-pointer text-gray-700 font-semibold py-4 px-4 min-w-[140px]"
//                       onClick={() => handleSort('fullName')}
//                     >
//                       <div className="flex items-center justify-between">
//                         Full Name
//                         <ArrowUpDown className="h-4 w-4 text-blue-500 ml-2" />
//                       </div>
//                     </TableHead>
//                     <TableHead
//                       className="cursor-pointer font-semibold text-gray-700 py-4 px-4 min-w-[160px]"
//                       onClick={() => handleSort('email')}
//                     >
//                       <div className="flex items-center justify-between">
//                         Email / Phone
//                         <ArrowUpDown className="h-4 w-4 text-blue-500 ml-2" />
//                       </div>
//                     </TableHead>
//                     <TableHead
//                       className="font-semibold text-gray-700 py-4 px-4 min-w-[140px] cursor-pointer"
//                       onClick={() => handleSort('inquirySource')}
//                     >
//                       <div className="flex items-center justify-between">
//                         Contact Source
//                         <ArrowUpDown className="h-4 w-4 text-blue-500 ml-2" />
//                       </div>
//                     </TableHead>
//                     <TableHead className="font-semibold text-gray-700 py-4 px-4 min-w-[120px] text-right">
//                       Status
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {status === 'loading' ? (
//                     <TableRow>
//                       <TableCell colSpan={4} className="text-center py-12">
//                         <div className="flex flex-col items-center space-y-3">
//                           <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//                           <span className="text-gray-600 font-medium">Loading contacts...</span>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ) : currentContacts.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={4} className="text-center py-16">
//                         <div className="flex flex-col items-center space-y-3">
//                           <AlertCircle className="h-12 w-12 text-gray-300" />
//                           <span className="text-xl font-semibold text-gray-500">No new contacts found</span>
//                           <p className="text-gray-400">Try adjusting your filters to see more results.</p>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     currentContacts.map((contact) => (
//                       <TableRow
//                         key={contact.contactId}
//                         className="hover:bg-gray-50/50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 cursor-pointer group"
//                         onClick={() => handleViewContact(contact.contactId)}
//                       >
//                         <TableCell className="py-4 px-4 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
//                           {contact.fullName || 'N/A'}
//                         </TableCell>
//                         <TableCell className="py-4 px-4 text-gray-600">
//                           {contact.email || contact.phone || 'N/A'}
//                         </TableCell>
//                         <TableCell className="py-4 px-4">
//                           <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
//                             {contact.inquirySource || 'Direct'}
//                           </span>
//                         </TableCell>
//                         <TableCell className="py-4 px-4 text-right">
//                           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
//                             <AlertCircle className="h-3 w-3 mr-1" />
//                             Contact Received
//                           </span>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>

//             {/* Pagination - Compact */}
//             {totalPages > 1 && (
//               <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 p-4 bg-gray-50 rounded-xl">
//                 <div className="flex items-center space-x-3 text-sm text-gray-600">
//                   <Label className="font-medium">Show</Label>
//                   <Select
//                     value={contactsPerPage.toString()}
//                     onValueChange={(value) => setContactsPerPage(Number(value))}
//                   >
//                     <SelectTrigger className="w-16 bg-white border-gray-200 focus:border-blue-500">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="8">8</SelectItem>
//                       <SelectItem value="10">10</SelectItem>
//                       <SelectItem value="20">20</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <span>per page</span>
//                   <span className="text-gray-400">({filteredAndSortedContacts.length} total)</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 h-8 w-8 p-0"
//                   >
//                     <span className="sr-only">Previous</span>
//                     <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </Button>
//                   <div className="flex space-x-1">
//                     {[...Array(totalPages).keys()].map((page) => (
//                       <Button
//                         key={page + 1}
//                         variant={currentPage === page + 1 ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => handlePageChange(page + 1)}
//                         className={cn(
//                           "h-8 w-8 p-0 font-medium transition-colors duration-200",
//                           currentPage === page + 1
//                             ? "bg-blue-600 text-white hover:bg-blue-700"
//                             : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//                         )}
//                       >
//                         {page + 1}
//                       </Button>
//                     ))}
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 h-8 w-8 p-0"
//                   >
//                     <span className="sr-only">Next</span>
//                     <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Add Contact Modal */}
//         <Dialog open={isAddModalOpen} onOpenChange={() => setIsAddModalOpen(false)}>
//           <DialogContent className="w-full max-w-2xl mx-auto rounded-2xl p-0 overflow-hidden shadow-2xl">
//             <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
//               <DialogTitle className="text-2xl font-bold flex items-center space-x-3">
//                 <PlusCircle className="h-6 w-6" />
//                 <span>Add New Contact</span>
//               </DialogTitle>
//             </DialogHeader>
//             <div className="p-6 bg-gray-50">
//               <ManualAddContactForm
//                 onSubmit={handleAddContact}
//                 onCancel={() => setIsAddModalOpen(false)}
//               />
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// } 



'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getRecentContacts, addContact } from '@/features/marketing/contactSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  ArrowUpDown,
  Calendar,
  AlertCircle,
  PlusCircle,
  X,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from 'sonner';
import ManualAddContactForm from './ManualAddContactForm';

export default function InitialContactReceived() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { recentContacts, status } = useSelector((state) => state.contact);

  const [sortField, setSortField] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterInquirySource, setFilterInquirySource] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(8);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fixed inquiry sources
  const inquirySources = ['all', 'Website', 'Social Media', 'Event', 'Referral', 'Marketing Team', 'Other'];

  useEffect(() => {
    dispatch(getRecentContacts());
  }, [dispatch]);

  const handleViewContact = (contactId) => {
    router.push(`/marketing/contacts/${contactId}`);
  };

  const resetDateRange = () => {
    setDateRange({ from: null, to: null });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [contactsPerPage]);

  const filteredAndSortedContacts = useMemo(() => {
    let result = recentContacts.filter((contact) => !contact.isDeleted);

    if (filterInquirySource !== 'all') {
      result = result.filter(
        (contact) => (contact.inquirySource || 'N/A') === filterInquirySource
      );
    }

    if (dateRange.from && dateRange.to) {
      result = result.filter((contact) =>
        contact.createdAt
          ? isWithinInterval(parseISO(contact.createdAt), {
              start: dateRange.from,
              end: dateRange.to,
            })
          : false
      );
    }

    result.sort((a, b) => {
      const fieldA = a[sortField] || '';
      const fieldB = b[sortField] || '';
      if (sortField === 'createdAt') {
        const dateA = fieldA ? parseISO(fieldA) : new Date(0);
        const dateB = fieldB ? parseISO(fieldB) : new Date(0);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return sortOrder === 'asc'
        ? String(fieldA).localeCompare(String(fieldB))
        : String(fieldB).localeCompare(String(fieldA));
    });

    return result;
  }, [recentContacts, sortField, sortOrder, filterInquirySource, dateRange]);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredAndSortedContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredAndSortedContacts.length / contactsPerPage);
  const totalNewContacts = filteredAndSortedContacts.length;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAddContact = (contactData) => {
    dispatch(addContact(contactData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Contact added successfully.');
        dispatch(getRecentContacts());
        setIsAddModalOpen(false);
      } else {
        toast.error('Failed to add contact.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden shadow-lg border-0 bg-white">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  New Inquiries Received ({totalNewContacts})
                </h2>
              </div>
              <Button
                className="bg-white text-teal-600 hover:bg-teal-50 font-semibold px-4 sm:px-6 py-2 shadow-md transition-all duration-200"
                onClick={() => setIsAddModalOpen(true)}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>
          <CardContent className="p-4 sm:p-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Filter className="h-4 w-4 text-teal-600" />
                  <span>Filter by Source</span>
                </div>
                <Select value={filterInquirySource} onValueChange={setFilterInquirySource}>
                  <SelectTrigger className="w-full bg-white border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors duration-200">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {inquirySources.map((source) => (
                      <SelectItem key={source} value={source} className="focus:bg-teal-50">
                        {source === 'all' ? 'All Sources' : source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  <span>Date Range</span>
                </div>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 px-3 py-2",
                          !dateRange.from && "text-gray-500"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4 text-teal-600" />
                        {dateRange.from && dateRange.to ? (
                          <span className="truncate max-w-[120px] sm:max-w-[200px]">
                            {`${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')}`}
                          </span>
                        ) : (
                          <span>Select Date Range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border-gray-300" align="start">
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        initialFocus
                        className="rounded-md border border-gray-300"
                      />
                    </PopoverContent>
                  </Popover>
                  {dateRange.from && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 w-6"
                      onClick={resetDateRange}
                      title="Clear Date Range"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Contacts Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-teal-100">
                    <TableHead
                      className="cursor-pointer text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-4 min-w-[120px]"
                      onClick={() => handleSort('fullName')}
                    >
                      <div className="flex items-center justify-between">
                        Full Name
                        <ArrowUpDown className="h-4 w-4 text-teal-600 ml-2" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer font-semibold text-gray-700 py-3 sm:py-4 px-3 sm:px-4 min-w-[140px]"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center justify-between">
                        Email / Phone
                        <ArrowUpDown className="h-4 w-4 text-teal-600 ml-2" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-700 py-3 sm:py-4 px-3 sm:px-4 min-w-[120px] cursor-pointer"
                      onClick={() => handleSort('inquirySource')}
                    >
                      <div className="flex items-center justify-between">
                        Contact Source
                        <ArrowUpDown className="h-4 w-4 text-teal-600 ml-2" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="font-semibold text-gray-700 py-3 sm:py-4 px-3 sm:px-4 min-w-[120px] cursor-pointer"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center justify-between">
                        Received At
                        <ArrowUpDown className="h-4 w-4 text-teal-600 ml-2" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {status === 'loading' ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-3">
                          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                          <span className="text-gray-600 font-medium">Loading contacts...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : currentContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-16">
                        <div className="flex flex-col items-center space-y-3">
                          <AlertCircle className="h-12 w-12 text-gray-300" />
                          <span className="text-xl font-semibold text-gray-500">No new contacts found</span>
                          <p className="text-gray-400">Try adjusting your filters to see more results.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentContacts.map((contact) => (
                      <TableRow
                        key={contact.contactId}
                        className="hover:bg-teal-50/30 transition-colors duration-150 border-b border-gray-100 last:border-b-0 cursor-pointer group"
                        onClick={() => handleViewContact(contact.contactId)}
                      >
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-4 font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                          {contact.fullName || 'N/A'}
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-4 text-gray-600">
                          {contact.email || contact.phone || 'N/A'}
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium">
                            {contact.inquirySource || 'Other'}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 sm:py-4 px-3 sm:px-4 text-gray-600">
                          {contact.createdAt ? format(parseISO(contact.createdAt), 'MMM dd, yyyy') : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Label className="font-medium">Show</Label>
                  <Select
                    value={contactsPerPage.toString()}
                    onValueChange={(value) => setContactsPerPage(Number(value))}
                  >
                    <SelectTrigger className="w-16 bg-white border-gray-300 focus:border-teal-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>per page</span>
                  <span className="text-gray-400">({filteredAndSortedContacts.length} total)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700 h-8 w-8 p-0"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <div className="flex space-x-1">
                    {[...Array(totalPages).keys()].map((page) => (
                      <Button
                        key={page + 1}
                        variant={currentPage === page + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page + 1)}
                        className={cn(
                          "h-8 w-8 p-0 font-medium transition-colors duration-200",
                          currentPage === page + 1
                            ? "bg-teal-600 text-white hover:bg-teal-700"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {page + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700 h-8 w-8 p-0"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Contact Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={() => setIsAddModalOpen(false)}>
          <DialogContent className="w-full max-w-md sm:max-w-lg mx-auto rounded-2xl p-0 overflow-hidden shadow-xl">
            <DialogHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
              <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center space-x-3">
                <PlusCircle className="h-6 w-6" />
                <span>Add New Contact</span>
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 sm:p-6 bg-gray-50">
              <ManualAddContactForm
                onSubmit={handleAddContact}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}