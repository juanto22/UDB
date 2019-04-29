package com.org.util.safe;

import java.math.BigInteger;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;

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


	/**
	 * Takes a string and converts each character to an correlationMap decimal value
	 * Returns BigInteger
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
		String output = StringUtils.EMPTY;
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
	 * 3. Compute Phi(n) (Euler's totient function) Phi(n) = (p-1)(q-1)
	 * BigIntegers are objects and must use methods for algebraic operations
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
	 * Recursive EXTENDED Euclidean algorithm, solves Bezout's identity (ax + by
	 * = gcd(a,b)) and finds the multiplicative inverse which is the solution to
	 * ax ≡ 1 (mod m) returns [d, p, q] where d = gcd(a,b) and ap + bq = d Note:
	 * Uses BigInteger operations
	 */
	public static BigInteger[] extEuclid(BigInteger a, BigInteger b) {
		if (b.equals(BigInteger.ZERO))
			return new BigInteger[] { a, BigInteger.ONE, BigInteger.ZERO }; // {
																			// a,
																			// 1,
																			// 0
																			// }
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

	public static BigInteger n(BigInteger p, BigInteger q) {
		return p.multiply(q);
	}

	/**
	 * generate e by finding a Phi such that they are coprimes (gcd = 1)
	 *
	 */
	public static BigInteger genE(BigInteger phi) {
		Random rand = new Random();
		BigInteger e = new BigInteger(10, rand);
		do {
			e = new BigInteger(10, rand);
			while (e.min(phi).equals(phi)) { // while phi is smaller than e,
												// look for a new e
				e = new BigInteger(10, rand);
			}
		} while (!gcd(e, phi).equals(BigInteger.ONE)); // if gcd(e,phi) isnt 1
														// then stay in loop
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
	
	public static String toStringMessage(BigInteger[] message){
		int lenghtMessage = message.length;
		String outputMessage = StringUtils.EMPTY;
		int i = 0;
		while (i < lenghtMessage) {
			outputMessage = outputMessage + " " + message[i].toString();
			i++;
		}
		return outputMessage;
	}
}
