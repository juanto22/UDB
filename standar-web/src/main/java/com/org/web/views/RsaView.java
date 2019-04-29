package com.org.web.views;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.omnifaces.cdi.ViewScoped;
import org.omnifaces.util.Messages;
import org.picketlink.Identity;

import com.google.common.base.Strings;
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
	private boolean disabledDecryptButton;

	@PostConstruct
	public void init() {
		this.message = StringUtils.EMPTY;
		this.encryptedMessage = StringUtils.EMPTY;
		this.descryptedMessage = StringUtils.EMPTY;
		this.originalMessage = StringUtils.EMPTY;
		disabledDecryptButton = true;
	}

	public void encryptMessage() {

		if(checkValidations()) {
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
			this.disabledDecryptButton = false;
		}
		
	}
	
	public boolean checkValidations() {
		
		boolean doEncrypt = true;
		
		if(!isPrimeNumber(p)) {
			doEncrypt  = false;
			Messages.create("Numero P").detail("p no es un numero primo").error().add();
		}
		
		if(!isPrimeNumber(q)) {
			doEncrypt = false;
			Messages.create("Numero q").detail("q no es un numero primo").error().add();
		}
		
		Strings.nullToEmpty(message);
		
		if(Strings.isNullOrEmpty(message) || message.codePoints().allMatch(c -> Character.isWhitespace(c))) {
			doEncrypt = false;
			Messages.create("Palabra a encriptar").detail("No puede ser nula o vacia").error().add();			
		}
				
		return doEncrypt;
 
	}
	
	public boolean isPrimeNumber(Integer number) {
		int count = 0;
		 
        for(int i = 1; i <= number; i++) {
            if((number % i) == 0) {
            	count++;
            }
        }
        
		return count == 2;
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
		this.disabledDecryptButton = true;
		
		this.n = new BigInteger("0");
		this.e = new BigInteger("0");
		this.phi = new BigInteger("0");
		Arrays.fill(this.encrypted, null);
	}

}
