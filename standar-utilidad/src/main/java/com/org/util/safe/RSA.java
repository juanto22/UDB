package com.org.util.safe;

import java.math.BigInteger;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Random;

public class RSA {

	private static final Map<String, Integer> correlationMap;
	static {
		Map<String, Integer> traslateMap = new HashMap<>();
		traslateMap.put("A", 0);
		traslateMap.put("B", 1);
		traslateMap.put("C", 2);
		traslateMap.put("D", 3);
		traslateMap.put("E", 4);
		traslateMap.put("F", 5);
		traslateMap.put("G", 6);
		traslateMap.put("H", 7);
		traslateMap.put("I", 8);
		traslateMap.put("J", 9);
		traslateMap.put("K", 10);
		traslateMap.put("L", 11);
		traslateMap.put("M", 12);
		traslateMap.put("N", 13);
		traslateMap.put("O", 14);
		traslateMap.put("P", 15);
		traslateMap.put("Q", 16);
		traslateMap.put("R", 17);
		traslateMap.put("S", 18);
		traslateMap.put("T", 19);
		traslateMap.put("U", 20);
		traslateMap.put("V", 21);
		traslateMap.put("W", 22);
		traslateMap.put("X", 23);
		traslateMap.put("Y", 24);
		traslateMap.put("Z", 25);
		correlationMap = Collections.unmodifiableMap(traslateMap);
	}

	public static void main(String[] args) {
		// 1. Find large primes p and q
//		BigInteger p = largePrime(11);
//		BigInteger q = largePrime(23);

		BigInteger p = BigInteger.valueOf(11L);
		BigInteger q = BigInteger.valueOf(23L);

		// 2. Compute n from p and q
		// n is mod for private & public keys, n bit length is key length
		BigInteger n = n(p, q);

		// 3. Compute Phi(n) (Euler's totient function)
		// Phi(n) = (p-1)(q-1)
		// BigIntegers are objects and must use methods for algebraic operations
		BigInteger phi = getPhi(p, q);

		// 4. Find an int e such that 1 < e < Phi(n) and gcd(e,Phi) = 1
		// BigInteger e = genE(phi);
		BigInteger e = BigInteger.valueOf(3L);

		// 5. Calculate d where d ≡ e^(-1) (mod Phi(n))
		// BigInteger d = extEuclid(e, phi)[1];
		BigInteger d = modInverse(e, phi);

		// Print generated values for reference
		System.out.println("p: " + p);
		System.out.println("q: " + q);
		System.out.println("n: " + n);
		System.out.println("Phi: " + phi);
		System.out.println("e: " + e);
		System.out.println("d: " + d);

		// encryption / decryption example
		String message = "seguridad";
		// Convert string to numbers using a cipher
		BigInteger[] cipherMessage = stringCipher(message);
		// Encrypt the ciphered message
		BigInteger[] encrypted = encrypt(cipherMessage, e, n);
		// Decrypt the encrypted message
		BigInteger[] decrypted = decrypt(encrypted, d, n);
		// Uncipher the decrypted message to text
		String restoredMessage = cipherToString(decrypted);

		System.out.println("Original message: " + message);
		System.out.println("Ciphered: " + cipherMessage);
		System.out.println("Encrypted: " + encrypted);
		System.out.println("Decrypted: " + decrypted);
		System.out.println("Restored: " + restoredMessage);
	}

	/**
	 * Takes a string and converts each character to an ASCII decimal value Returns
	 * BigInteger
	 */
	public static BigInteger[] stringCipher(String message) {
		message = message.toUpperCase();
		int lenghtMessage = message.length();
		BigInteger[] cipherBigInteger = new BigInteger[lenghtMessage];
		int i = 0;
		while (i < lenghtMessage) {
			Integer value = correlationMap.get(String.valueOf(message.charAt(i)));
			cipherBigInteger[i] = BigInteger.valueOf(value.longValue());
			i++;
		}
		return cipherBigInteger;
	}

	/**
	 * Takes a BigInteger that is ciphered and converts it back to plain text
	 * returns a String
	 */
	public static String cipherToString(BigInteger[] message) {
		String output = "";
		int lenghtMessage = message.length;
		int i = 0;
		while (i < lenghtMessage) {
			String value = getKeyByValue(correlationMap, message[i].intValue());
			output = output + value;
			i++;
		}
		return output;
	}

	/**
	 * 3. Compute Phi(n) (Euler's totient function) Phi(n) = (p-1)(q-1) BigIntegers
	 * are objects and must use methods for algebraic operations
	 */
	public static BigInteger getPhi(BigInteger p, BigInteger q) {
		BigInteger phi = (p.subtract(BigInteger.ONE)).multiply(q.subtract(BigInteger.ONE));
		return phi;
	}

	/**
	 * Generates a random large prime number of specified bitlength
	 *
	 */
	public static BigInteger largePrime(int bits) {
		Random randomInteger = new Random();
		BigInteger largePrime = BigInteger.probablePrime(bits, randomInteger);
		return largePrime;
	}

	/**
	 * Recursive implementation of Euclidian algorithm to find greatest common
	 * denominator Note: Uses BigInteger operations
	 */
	public static BigInteger gcd(BigInteger a, BigInteger b) {
		if (b.equals(BigInteger.ZERO)) {
			return a;
		} else {
			return gcd(b, a.mod(b));
		}
	}

	/**
	 * Recursive EXTENDED Euclidean algorithm, solves Bezout's identity (ax + by =
	 * gcd(a,b)) and finds the multiplicative inverse which is the solution to ax ≡
	 * 1 (mod m) returns [d, p, q] where d = gcd(a,b) and ap + bq = d Note: Uses
	 * BigInteger operations
	 */
	public static BigInteger[] extEuclid(BigInteger a, BigInteger b) {
		if (b.equals(BigInteger.ZERO))
			return new BigInteger[] { a, BigInteger.ONE, BigInteger.ZERO }; // { a, 1, 0 }
		BigInteger[] vals = extEuclid(b, a.mod(b));
		BigInteger d = vals[0];
		BigInteger p = vals[2];
		BigInteger q = vals[1].subtract((a.divide(b)).multiply(vals[2]));
		return new BigInteger[] { d, p, q };
	}

	/**
	 * generate d by e and phi they are coprimes (gcd = 1)
	 *
	 */
	public static BigInteger modInverse(BigInteger e, BigInteger phi) {
		return e.modInverse(phi);
	}

	/**
	 * generate e by finding a Phi such that they are coprimes (gcd = 1)
	 *
	 */
	public static BigInteger genE(BigInteger phi) {
		Random rand = new Random();
		BigInteger e = new BigInteger(1024, rand);
		do {
			e = new BigInteger(1024, rand);
			while (e.min(phi).equals(phi)) { // while phi is smaller than e, look for a new e
				e = new BigInteger(1024, rand);
			}
		} while (!gcd(e, phi).equals(BigInteger.ONE)); // if gcd(e,phi) isnt 1 then stay in loop
		return e;
	}

	public static BigInteger[] encrypt(BigInteger[] message, BigInteger e, BigInteger n) {
		int lenghtMessage = message.length;
		BigInteger[] encryptMessage = new BigInteger[lenghtMessage];
		int i = 0;
		while (i < lenghtMessage) {
			encryptMessage[i] = message[i].modPow(e, n);
			i++;
		}
		return encryptMessage;
	}

	public static BigInteger[] decrypt(BigInteger[] message, BigInteger d, BigInteger n) {
		int lenghtMessage = message.length;
		BigInteger[] decryptMessage = new BigInteger[lenghtMessage];
		int i = 0;
		while (i < lenghtMessage) {
			decryptMessage[i] = message[i].modPow(d, n);
			i++;
		}
		return decryptMessage;
	}

	public static String getKeyByValue(Map<String, Integer> map, Integer value) {
		for (Entry<String, Integer> entry : map.entrySet()) {
			if (Objects.equals(value, entry.getValue())) {
				return entry.getKey();
			}
		}
		return null;
	}

	public static BigInteger n(BigInteger p, BigInteger q) {
		return p.multiply(q);
	}
}
