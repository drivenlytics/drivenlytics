import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Save to file in /discovery-responses folder
    const responsesDir = path.join(process.cwd(), 'discovery-responses');

    if (!fs.existsSync(responsesDir)) {
      fs.mkdirSync(responsesDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${data.clientName.replace(/\s+/g, '-')}-${timestamp}.json`;
    const filepath = path.join(responsesDir, filename);

    const formattedData = {
      submittedAt: new Date().toISOString(),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      discovery: {
        northStar: data.northStar,
        integrations: data.integrations,
        sourceOfTruth: data.sourceOfTruth,
        deliveryPayload: data.deliveryPayload,
        behavioralRules: data.behavioralRules,
      },
    };

    fs.writeFileSync(filepath, JSON.stringify(formattedData, null, 2));

    // Optional: Send email notification (uncomment if configured)
    // await sendEmailNotification(data);

    return NextResponse.json({
      success: true,
      message: 'Discovery responses saved',
      clientName: data.clientName,
    });
  } catch (error) {
    console.error('Discovery form error:', error);
    return NextResponse.json(
      { error: 'Failed to save discovery responses' },
      { status: 500 }
    );
  }
}
