using System;
using System.Collections;
using System.Security.Cryptography;
using System.Text;

public class EncryptionHelper
{
    // Salt size in bytes
    private const int SaltSize = 32;

    // Hash size in bytes
    private const int HashSize = 32;

    // Generate a random salt
    private static byte[] GenerateSalt()
    {
        using (var rng = new RNGCryptoServiceProvider())
        {
            byte[] salt = new byte[SaltSize];
            rng.GetBytes(salt);
            return salt;
        }
    }

    // Hash the password with salt
    public static string HashPassword(string password)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            // Compute hash from the password
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Convert byte array to a string representation
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2")); // Convert byte to hexadecimal string
            }
            return builder.ToString();
        }
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            // Compute hash of the provided password
            string hashOfInput = HashPassword(password);

            // Compare the computed hash with the provided hashed password
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;
            return comparer.Compare(hashOfInput, hashedPassword) == 0;
        }
    }
}