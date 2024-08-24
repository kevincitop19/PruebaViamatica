using System;
using System.Collections.Generic;

namespace WebApiLibreria.Entities;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public int? UserId { get; set; }

 

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();

    public virtual User? User { get; set; }
}
