package com.org.web.views;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.omnifaces.cdi.ViewScoped;
import org.picketlink.Identity;

import com.org.util.safe.RSA;

import lombok.Getter;
import lombok.Setter;

@Named
@ViewScoped
@Getter
@Setter
public class RsaView implements Serializable {

	private static final long serialVersionUID = -432132454L;

	@Inject
	private Identity identity;

	private Integer p;
	private Integer q;
	private String message;
	private String encryptedMessage;
	private String descryptedMessage;
	private String originalMessage;

	private BigInteger n;
	private BigInteger e;
	private BigInteger phi;
	private BigInteger[] encrypted;

	@PostConstruct
	public void init() {
		this.message = StringUtils.EMPTY;
		this.encryptedMessage = StringUtils.EMPTY;
		this.descryptedMessage = StringUtils.EMPTY;
		this.originalMessage = StringUtils.EMPTY;
	}

	public void encryptMessage() {
		BigInteger p = BigInteger.valueOf(this.p.longValue());
		BigInteger q = BigInteger.valueOf(this.q.longValue());

		this.phi = RSA.getPhi(p, q);
		this.n = RSA.n(p, q);
		this.e = RSA.genE(phi);

		// Convert string to numbers using a cipher
		BigInteger[] cipherMessage = RSA.stringCipher(message);
		// Encrypt the ciphered message
		this.encrypted = RSA.encrypt(cipherMessage, e, n);
		String outputEncrypt = RSA.toStringMessage(this.encrypted);
		this.encryptedMessage = outputEncrypt;
	}

	public void decryptMessage() {
		BigInteger d = RSA.modInverse(this.e, this.phi);
		// Decrypt the encrypted message
		BigInteger[] decrypted = RSA.decrypt(this.encrypted, d, this.n);

		String outputDecrypt = RSA.toStringMessage(decrypted);
		this.descryptedMessage = outputDecrypt;

		// Uncipher the decrypted message to text
		String restoredMessage = RSA.cipherToString(decrypted);
		this.originalMessage = restoredMessage;
	}

	public void clearAll() {
		this.p = 0;
		this.q = 0;
		this.message = StringUtils.EMPTY;
		this.encryptedMessage = StringUtils.EMPTY;
		this.descryptedMessage = StringUtils.EMPTY;
		this.originalMessage = StringUtils.EMPTY;

		this.n = new BigInteger("0");
		this.e = new BigInteger("0");
		this.phi = new BigInteger("0");
		Arrays.fill(this.encrypted, null);
	}

}
