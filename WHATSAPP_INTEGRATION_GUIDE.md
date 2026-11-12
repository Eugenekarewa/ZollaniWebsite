# WhatsApp Product Integration Guide

## How to Post Products via WhatsApp

To add products to your website via WhatsApp, simply send a message with the following format:

### Basic Format:
```
[Product Name]
Price: KES [amount]
Category: [refurbished-laptop|gaming-pc|workstation|upgrade-kit|monitor|smart-home-camera|mouse|desktop-cpu|mini-pc]
Specs: [spec1, spec2, spec3...]
Condition: [Certified Refurbished|Brand New Custom Build|Hardware Bundle]
Warranty: [duration]
Description: [product description]
```

### Example:
```
Lenovo ThinkPad T480 Business Laptop
Price: KES 36,500
Category: refurbished-laptop
Specs: Intel Core i7 8th Gen, 16GB RAM, 512GB SSD, 14" FHD Display
Condition: Certified Refurbished
Warranty: 6 Months Warranty
Description: Durable business laptop with excellent performance. Includes original charger and Windows 11 Pro license.
```

## How It Works

1. Send your product details via WhatsApp to your business number
2. The system automatically parses your message and creates a product draft
3. Log in to your admin panel at `/admin/shop` to review and publish drafts
4. Once published, products appear immediately on your website's shop page

## Admin Review Process

1. Navigate to `/admin/shop` 
2. Find your product in the "Pending Drafts" section
3. Click "Edit" to review and adjust any details
4. Click "Publish" to make the product live on your website

## Technical Details

- Webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
- Simple posting URL: `https://yourdomain.com/api/whatsapp/simple-post`
- All products are saved as drafts first - nothing goes live without your approval
- Images are automatically downloaded and stored when sent with messages

## Troubleshooting

If products aren't appearing:
1. Check that your WhatsApp business account is properly connected
2. Verify the webhook URL is correctly configured in your Facebook Developer Console
3. Ensure the VERIFY_TOKEN matches between your .env file and Facebook settings
4. Check server logs for any errors