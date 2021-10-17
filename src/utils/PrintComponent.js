import { savePDF } from '@progress/kendo-react-pdf';

const exportPDFWithMethod = (componentRef) => {
  let element = componentRef.current || document.body;
  savePDF(element, {
    paperSize: 'auto',
    margin: 40,
    fileName: `Report for ${new Date().getFullYear()}`,
  });
};

export default exportPDFWithMethod;
