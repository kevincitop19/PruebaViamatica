using WebApiLibreria.Entities;

namespace WebApiLibreria.Interfaces
{
    public interface IFactura
    {
        Task<Invoice> RegistInvoice(Invoice invoice);
        Task<Invoice> GetInvoice(int invoiceId);

        Task<InvoiceDetail> RegisterInvoiceDetails(InvoiceDetail invoice);
        Task<InvoiceDetail> GetInvoiceDetail(int InvoiceDetailid);


    }
}
