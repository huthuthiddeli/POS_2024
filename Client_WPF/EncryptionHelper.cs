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
        byte[] salt = GenerateSalt();
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] saltedPasswordBytes = new byte[passwordBytes.Length + salt.Length];

        Buffer.BlockCopy(passwordBytes, 0, saltedPasswordBytes, 0, passwordBytes.Length);
        Buffer.BlockCopy(salt, 0, saltedPasswordBytes, passwordBytes.Length, salt.Length);

        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(saltedPasswordBytes);
            byte[] hashWithSaltBytes = new byte[hashedBytes.Length + salt.Length];

            Buffer.BlockCopy(hashedBytes, 0, hashWithSaltBytes, 0, hashedBytes.Length);
            Buffer.BlockCopy(salt, 0, hashWithSaltBytes, hashedBytes.Length, salt.Length);

            return Convert.ToBase64String(hashWithSaltBytes);
        }
    }

    // Verify the password with the hashed value
    public static bool VerifyPassword(string password, string hashedPassword)
    {
        byte[] hashWithSaltBytes = Convert.FromBase64String(hashedPassword);
        byte[] salt = new byte[SaltSize];
        byte[] hashedBytes = new byte[hashWithSaltBytes.Length - salt.Length];

        Buffer.BlockCopy(hashWithSaltBytes, 0, hashedBytes, 0, hashedBytes.Length);
        Buffer.BlockCopy(hashWithSaltBytes, hashedBytes.Length, salt, 0, salt.Length);

        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] saltedPasswordBytes = new byte[passwordBytes.Length + salt.Length];

        Buffer.BlockCopy(passwordBytes, 0, saltedPasswordBytes, 0, passwordBytes.Length);
        Buffer.BlockCopy(salt, 0, saltedPasswordBytes, passwordBytes.Length, salt.Length);

        using (var sha256 = SHA256.Create())
        {
            byte[] rehashedBytes = sha256.ComputeHash(saltedPasswordBytes);
            return StructuralComparisons.StructuralEqualityComparer.Equals(rehashedBytes, hashedBytes);
        }
    }
}