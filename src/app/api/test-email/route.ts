import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { error } = await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: ["admin@enibrand.com"],
      subject: "🧪 Localhost Test Email",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #017544;">✅ Email Service Working!</h2>
          <p>This is a test email sent from your localhost development server.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Server:</strong> localhost:3001</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
    });
  } catch (err) {
    console.error("Test email error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send test email",
      },
      { status: 500 }
    );
  }
}
 // FOR A MUCH MORE ROBUS TEST

 export async function POST(request: NextRequest) {
   try {
     const body = await request.json();
     const { personalInfo, communication, compliance, metadata } = body;
 
     // Create a nice HTML email template
     const emailHtml = `
       <!DOCTYPE html>
       <html>
       <head>
         <meta charset="utf-8">
         <title>New Contact Form Submission</title>
         <style>
           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
           .header { background: #017544; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
           .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
           .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; }
           .section h3 { margin-top: 0; color: #017544; }
           .field { margin-bottom: 10px; }
           .field strong { color: #555; }
           .message-box { background: #f0f8f4; padding: 15px; border-left: 4px solid #017544; }
         </style>
       </head>
       <body>
         <div class="container">
           <div class="header">
             <h1>🎉 New Contact Form Submission</h1>
             <p>Someone reached out to you through your website!</p>
           </div>
           
           <div class="content">
             <div class="section">
               <h3>👤 Personal Information</h3>
               <div class="field"><strong>Name:</strong> ${
                 personalInfo.fullName
               }</div>
               <div class="field"><strong>Email:</strong> ${
                 personalInfo.email
               }</div>
             </div>
 
             <div class="section">
               <h3>💬 Message</h3>
               <div class="message-box">
                 ${communication.message.replace(/\n/g, "<br>")}
               </div>
             </div>
 
             <div class="section">
               <h3>📊 Submission Details</h3>
               <div class="field"><strong>Submitted:</strong> ${new Date(
                 communication.timestamp
               ).toLocaleString()}</div>
               <div class="field"><strong>Source:</strong> ${
                 communication.source
               }</div>
               <div class="field"><strong>Page URL:</strong> ${
                 metadata.pageUrl
               }</div>
               <div class="field"><strong>Referrer:</strong> ${
                 metadata.referrer || "Direct"
               }</div>
               <div class="field"><strong>Submission ID:</strong> ${
                 metadata.submissionId
               }</div>
             </div>
 
             <div class="section">
               <h3>✅ Compliance</h3>
               <div class="field"><strong>Privacy Policy Agreed:</strong> ${
                 compliance.agreedToPolicy ? "Yes" : "No"
               }</div>
               <div class="field"><strong>Agreement Time:</strong> ${new Date(
                 compliance.agreementTimestamp
               ).toLocaleString()}</div>
             </div>
           </div>
         </div>
       </body>
       </html>
     `;
 
     // Send email to admin
     const { error } = await resend.emails.send({
       from: "Contact Form <onboarding@resend.dev>", // Resend's testing domain - works on localhost!
         to: ["damilolash@gmail.com"],   //   to: ["admin@enibrand.com"],
       subject: `New Contact: ${personalInfo.fullName} - ${
         communication.timestamp.split("T")[0]
       }`,
       html: emailHtml,
       replyTo: personalInfo.email, // So you can reply directly to the sender
     });
 
     if (error) {
       console.error("Resend error:", error);
       return NextResponse.json(
         { message: "Failed to send email", error: error.message },
         { status: 500 }
       );
     }
 
     // Optional: Also send a confirmation email to the user
     await resend.emails.send({
       from: "Eni Brand <onboarding@resend.dev>", // Using Resend's testing domain
       to: ["damilolash@gmail.com"], //to: [personalInfo.email],
       subject: "Thank you for contacting us!",
       html: `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
           <h2 style="color: #017544;">Thank you, ${personalInfo.firstName}!</h2>
           <p>We've received your message and will get back to you within 24 hours.</p>
           <div style="background: #f0f8f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
             <h4>Your message:</h4>
             <p style="font-style: italic;">"${communication.message}"</p>
           </div>
           <p>Best regards,<br>The Eni Brand Team</p>
         </div>
       `,
     });
 
     return NextResponse.json(
       {
         message: "Contact form submitted successfully!",
         submissionId: metadata.submissionId,
       },
       { status: 200 }
     );
   } catch (error) {
     console.error("Contact form submission error:", error);
     return NextResponse.json(
       { message: "Internal server error", error: "Something went wrong" },
       { status: 500 }
     );
   }
 }
 