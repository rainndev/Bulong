import { NextRequest, NextResponse } from "next/server";

function getDeviceInfo(userAgent: string) {
  const isMobile = /Mobi|Android/i.test(userAgent);

  let os = "Unknown";
  if (/Android/i.test(userAgent)) os = "Android";
  else if (/iPhone|iPad/i.test(userAgent)) os = "iOS";
  else if (/Windows/i.test(userAgent)) os = "Windows";
  else if (/Macintosh/i.test(userAgent)) os = "macOS";

  let browser = "Other";
  if (/Chrome/i.test(userAgent)) browser = "Chrome";
  else if (/Safari/i.test(userAgent)) browser = "Safari";
  else if (/Firefox/i.test(userAgent)) browser = "Firefox";

  return {
    device: isMobile ? "Mobile" : "Desktop",
    os,
    browser,
  };
}

export async function GET(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";

  const country = req.headers.get("x-vercel-ip-country") || "Unknown";
  const region = req.headers.get("x-vercel-ip-country-region") || "Unknown";

  const deviceInfo = getDeviceInfo(userAgent);

  return NextResponse.json({
    device: deviceInfo.device,
    os: deviceInfo.os,
    browser: deviceInfo.browser,
    country,
    region,
  });
}
