import '../../App.css';
import '../Users/style.css';
import React,{useState}  from 'react';
import '../../App.css';
import { MdArrowBack } from 'react-icons/md';
import { MdArrowForward } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

const Reports = () => {
  return (
    <div className='Main'>
      <ReportMain />
      </div>
  );
};


const reportsData = [
    { 
        id: 1,
        reporter: 'Amel',
        targetUser: 'Wail',
        reportMessage: 'Details of the report message',
        concernedMessage: 'Details of the concerned message',
        reportDate: '2023-11-19',},
  ];


const ReportMain = () => {

    const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [selectedReport, setSelectedReport] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
    
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedReportIds(selectAll ? [] : reportsData.map((report) => report.id));
      };
    
      const handleSelectReport = (reportId) => {
        if (selectedReportIds.includes(reportId)) {
          setSelectedReportIds(selectedReportIds.filter((id) => id !== reportId));
        } else {
          setSelectedReportIds([...selectedReportIds, reportId]);
        }
      };
    
      const handleActionChange = (e) => {
        setSelectedAction(e.target.value);
      };

    const handleSeeDetails = (reportId) => {
        const report = reportsData.find((report) => report.id === reportId);
        setSelectedReport(report);
      };
    
      const handleBackToReports = () => {
        setSelectedReport(null);
      };

  return (
       <div>
        <ReportHeader/>

       <div style={{height:'81.2%'}}>
       <div className='top-container'>
       <div id="search-container">
         <input
           type="text"
           placeholder="Search in users ..."
           value={searchTerm}
           onChange={handleSearch}
         />
           <FaSearch className="search-icon" />
         </div>
         <div className='actions'>
         <label style={{display:'flex',justifyContent:'space-around',alignItems:'center',}}>
         <input type="checkbox" checked={selectAll} onChange={handleSelectAll} style={{width:'20px'}} />
           Select All
         </label>
         <div id='options'>
           <label >
             <select value={selectedAction} onChange={handleActionChange} style={{}}>
               <option value="">Actions</option>
               <option value="action1">DELETE</option>
             </select>
           </label>
           </div>
         </div>
       </div>
       </div>
       {selectedReport ? (
         <ReportDetails report={selectedReport} onBack={handleBackToReports} />
       ) : (
         <>
           {reportsData.map(reportData => (
           <div key={reportData.id} className="report-container">
           <p>{`${reportData.reporter} has reported a misbehaviour by ${reportData.targetUser}`}</p>
           <MdArrowForward className="details-icon" onClick={() => handleSeeDetails(reportData.id)} />
           <label>
       <input
  type='checkbox'
  checked={selectedReportIds.includes(reportData.id)}
  onChange={() => handleSelectReport(reportData.id)}
/>
                    </label>
  </div>
))}

         </>
       )}
       
     </div>
  )
};

const ReportHeader = () => {
   
    return (
      <div id="container">
        <div className='head'>
        <h1>Reports</h1>
        
        </div>
      </div>
    );
    };

const ReportDetails = ({ report, onBack }) => {
    return (
        <div>
        <p>{`${report.reporter} has reported a misbehaviour by ${report.targetUser}`}</p>
        
        <div className="details-section">
          <h4>Report Message</h4>
          <p>{report.reportMessage}</p>
        </div>
  
        <div className="details-section">
          <h4>Concerned Message</h4>
          <p>{report.concernedMessage}</p>
        </div>
  
        <div className="details-section">
          <h4>Report Date</h4>
          <p>{report.reportDate}</p>
        </div>
  
        <MdArrowBack className="details-icon" onClick={onBack} />
      </div>
    );
  };



export default Reports;
