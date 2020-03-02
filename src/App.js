import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Template1 from './app/basic/template1';
import Spinner from './app/plugins/spinner';
import FetchAPI from './app/services/FetchAPI';

const resumeAPI = new FetchAPI('resume');

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResume()
  }, []);

  async function loadResume() {
    setIsLoading(true);
    try {
      const resumeRes = await resumeAPI.fetch({
        type: 'get'
      });
      if (resumeRes && resumeRes !== resumeData) {
        setResumeData(resumeRes);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 220, 297);
        pdf.save("download.pdf");
      })
    ;
  }

  return (
    <React.Fragment>
      <div className="mb5">
        <button onClick={printDocument}>Print</button>
      </div>
      {
        isLoading ? (
          <Spinner />
        ) : <div className="App">
            <Template1 id="divToPrint" infor={resumeData.infor} className="template" />
          </div>
      }
    </React.Fragment>
  );
}

export default App;
