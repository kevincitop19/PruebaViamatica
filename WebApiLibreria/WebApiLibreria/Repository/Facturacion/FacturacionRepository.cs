using Microsoft.EntityFrameworkCore;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Persistencia;

namespace WebApiLibreria.Repository.Facturacion
{
    public class FacturacionRepository: IFactura
    {
        public readonly SalesSystemContext _salesSystem;

        public FacturacionRepository(SalesSystemContext salesSystem)
        {
            _salesSystem = salesSystem;
        }

        public async Task<Invoice> GetInvoice(int invoiceId)
        {
            return await _salesSystem.Invoices.FirstOrDefaultAsync(p => p.InvoiceId == invoiceId);
        }

        public async Task<InvoiceDetail> GetInvoiceDetail(int InvoiceDetailid)
        {
            return await _salesSystem.InvoiceDetails.FirstOrDefaultAsync(p => p.InvoiceDetailId == InvoiceDetailid);
        }

        public async Task<InvoiceDetail> RegisterInvoiceDetails(InvoiceDetail invoiceDetail)
        {
            invoiceDetail.Subtotal = invoiceDetail.Quantity * invoiceDetail.UnitPrice;
            invoiceDetail.Tax = invoiceDetail.Subtotal * 0.15m; 
            invoiceDetail.Total = invoiceDetail.Subtotal + invoiceDetail.Tax;

            _salesSystem.InvoiceDetails.Add(invoiceDetail);
            await _salesSystem.SaveChangesAsync();
            return invoiceDetail;
        }

        public async Task<Invoice> RegistInvoice(Invoice invoice)
        {
            _salesSystem.Invoices.Add(invoice);

            await _salesSystem.SaveChangesAsync();

            return invoice;
        }
    }
}
