using System;
using System.Collections.Generic;

namespace WebApiLibreria.Entities;

public partial class InvoiceDetail
{
    public int InvoiceDetailId { get; set; }



    public int? ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal? Subtotal { get; set; }

    public decimal? Tax { get; set; }

    public decimal? Total { get; set; }

  

    public virtual Product? Product { get; set; }
}
