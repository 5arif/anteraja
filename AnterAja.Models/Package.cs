using System;

namespace AnterAja.Models
{
    public class Package
    {
        public Guid Id { get; set; }
        public string PackageName { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string SenderAddress { get; set; }
        public string SenderName { get; set; }
        public string PackageRecipient { get; set; }
        public string RecipientAddress { get; set; }
    }
}
