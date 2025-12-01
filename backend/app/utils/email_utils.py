import os
import smtplib
from email.mime.text import MIMEText

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")


def send_reset_email(to_email: str, otp: str):
    """
    Sends password reset OTP email using Gmail SMTP.
    """

    subject = "MindPlate Password Reset OTP"
    body = f"""
    Hello,

    Your OTP for resetting your MindPlate password is: {otp}

    This OTP will expire in 10 minutes.

    If you did not request a password reset, please ignore this email.

    - MindPlate Team
    """

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())

        print(f"✔ OTP sent successfully to {to_email}")

    except Exception as e:
        print("❌ Error sending email:", e)
        raise Exception("Failed to send OTP email")
