using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.CodeDom;
using WebApiLibreria.Entities;
using WebApiLibreria.Interfaces;

namespace WebApiLibreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly IFactura _factura;

        public FacturaController(IFactura factura)
        {
            _factura = factura;
        }

        
        [HttpGet]
        public ActionResult<IEnumerable<InvoiceDetail>> GetInvoiceDetails(int idInvoice)
        {
            var factura = _factura.GetInvoice(idInvoice);

            if (factura == null)
            {
                return NotFound();
            }

            return Ok(factura);
        }

        [HttpPost("RegisterInvoiceDetails")]
        public async Task<ActionResult<InvoiceDetail>> RegisterInvoiceDetails([FromBody] InvoiceDetail invoiceDetail)
        {
            if (invoiceDetail == null)
            {
                return BadRequest("InvoiceDetail object is null");
            }

            try
            {
                var result = await _factura.RegisterInvoiceDetails(invoiceDetail);
                return CreatedAtAction(nameof(RegisterInvoiceDetails), new { id = result.InvoiceDetailId }, result);
            }
            catch (Exception ex)
            {
                // Manejo de errores, si es necesario
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
