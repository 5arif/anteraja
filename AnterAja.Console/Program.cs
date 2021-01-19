using System;

namespace AnterAja.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Siapa nama anda");
            var name = Console.ReadLine();

            Console.WriteLine($"{name} sudah  minum kopi ? (Y/N)");
            var coffee = Console.ReadLine().Trim().ToUpper() == "Y";

            Console.WriteLine(coffee ? $"{name} sudah siap coding\nkuy gas poll" : $"{name} belum siap coding\nkuy ngopi dulu");
            Console.ReadKey();
        }
    }
}
