Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630

$bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# 1. Warm off-white minimal background (#FAF9F6)
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 249, 246))
$graphics.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Minimal Frame (#E5E2DD)
$framePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(229, 226, 221), 2)
$graphics.DrawRectangle($framePen, 40, 40, 1120, 550)

# Colors
$charcoal = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(37, 37, 37))
$taupe = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(169, 154, 137))
$gray = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(119, 119, 119))
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

# 3. Pretitle Label
$pretitleFont = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("DIGITAL MARKETER  *  SOCIAL MEDIA MANAGER", $pretitleFont, $taupe, 80, 85)

# 4. Monogram & Name
$monogramRect = New-Object System.Drawing.Rectangle(80, 130, 72, 72)
$graphics.FillRectangle($charcoal, $monogramRect)

$monoFont = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("DP", $monoFont, $white, 88, 138)

$nameFont = New-Object System.Drawing.Font("Segoe UI", 42, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("Dhara Patel", $nameFont, $charcoal, 175, 126)

$locFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Regular)
$graphics.DrawString("Vadodara, Gujarat, India", $locFont, $gray, 180, 192)

# 5. Main Heading
$headingFont = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Bold)
$heading = "Helping Small Businesses Build`na Better Online Presence."
$graphics.DrawString($heading, $headingFont, $charcoal, 80, 255)

# 6. Supporting Text
$subFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
$subText = "Digital marketing and social media support for businesses that want to`nshow up online with clarity, consistency, and genuine audience engagement."
$graphics.DrawString($subText, $subFont, $gray, 80, 360)

# 7. Minimal Action Boxes
$cardPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(229, 226, 221), 1)

# WhatsApp Box
$waRect = New-Object System.Drawing.Rectangle(80, 460, 420, 80)
$graphics.FillRectangle($charcoal, $waRect)

$btnLabelFont = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$btnValFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("WHATSAPP ME", $btnLabelFont, $white, 105, 472)
$graphics.DrawString("+91 96019 07678", $btnValFont, $white, 105, 495)

# Email Box
$emRect = New-Object System.Drawing.Rectangle(530, 460, 420, 80)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.FillRectangle($whiteBrush, $emRect)
$graphics.DrawRectangle($cardPen, $emRect)

$graphics.DrawString("EMAIL ME", $btnLabelFont, $taupe, 555, 472)
$graphics.DrawString("pdharac2707@gmail.com", $btnValFont, $charcoal, 555, 495)

# Save
$outputPath = "c:\Users\ADMIN\Desktop\antugravity_learnproject\og-image.png"
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Successfully updated minimal $outputPath"
