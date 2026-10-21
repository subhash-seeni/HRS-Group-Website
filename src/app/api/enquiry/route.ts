import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = enquirySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Factual logging per Phase 0 / Phase 1 brief:
    // Forms post to a Next.js route handler that validates and logs
    console.info('[HRS Group Enquiry Received]', {
      timestamp: new Date().toISOString(),
      entitySlug: data.entitySlug,
      name: data.name,
      email: data.email,
      phone: data.phone || 'N/A',
      audienceType: data.audienceType,
      messageLength: data.message.length,
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry received. The relevant group division will respond within two business days.',
    });
  } catch (error) {
    console.error('[HRS Group Enquiry Error]', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process enquiry at this time.',
      },
      { status: 500 }
    );
  }
}
