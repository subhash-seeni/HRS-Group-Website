import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactServerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (minimum 2 characters)'),
  workEmail: z.string().email('Please enter a valid work email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  company: z.string().optional(),
  entity: z.string().min(1, 'Please select the business you are contacting'),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.literal(true, {
    message: 'You must consent to proceed with your enquiry',
  }),
  botField: z.string().max(0, 'Spam detected').optional(),
});

// Extensible delivery service: swap this function to route to Salesforce, HubSpot, or SendGrid
async function dispatchToCrmOrEmail(payload: z.infer<typeof contactServerSchema>) {
  // In production, configure environment variables for SMTP or CRM API:
  // e.g. await sendEmail({ to: 'enquiries@hrsgroup.in', subject: `Enquiry: ${payload.entity}`, data: payload });
  // e.g. await pushToCrmLead(payload);
  console.log('[HRS Contact Gateway] Commercial dispatch registered:', {
    timestamp: new Date().toISOString(),
    entity: payload.entity,
    enquiryType: payload.enquiryType,
    client: `${payload.fullName} (${payload.workEmail})`,
    company: payload.company || 'Not specified',
    phone: payload.phone,
    messageLength: payload.message.length,
  });
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check honeypot spam field
    if (body.botField && body.botField.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    const parseResult = contactServerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    await dispatchToCrmOrEmail(parseResult.data);

    return NextResponse.json(
      {
        success: true,
        message: 'We will respond within one working day',
        referenceId: `HRS-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[HRS Contact API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
