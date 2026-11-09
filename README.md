Method| Endpoint| Description| Access
POST| "/orders"| Create an order / ثبت سفارش| Authenticated
GET| "/orders"| List current user's orders / فهرست سفارش‌های کاربر| Authenticated
GET| "/orders/:id"| Get user's order / دریافت سفارش کاربر| Authenticated
PATCH| "/orders/:id/cancel"| Cancel a pending order / لغو سفارش در انتظار| Authenticated
PATCH| "/orders/:id"| Update order status / تغییر وضعیت سفارش| Admin / Manager
GET| "/orders/all"| List all orders / فهرست سفارش‌ها| Admin / Manager
GET| "/orders/all/:id"| Get an order by ID / دریافت سفارش با شناسه| Admin / Manager
GET| "/orders/user/:userId"| List a user's orders / فهرست سفارش‌های یک کاربر| Admin / Manager
GET| "/orders/user/:userId/:orderId"| Get a specific user order / دریافت سفارش مشخص کاربر| Admin / Manager

Payments — "/payments"

Method| Endpoint| Description| Access
POST| "/payments/create"| Create a payment record / ایجاد رکورد پرداخت| Authenticated
POST| "/payments/pay"| Submit simulated payment result / ثبت نتیجه پرداخت شبیه‌سازی‌شده| Authenticated
GET| "/payments/user"| List current user's payments / فهرست پرداخت‌های کاربر| Authenticated
GET| "/payments/user/:id"| Get current user's payment / دریافت پرداخت کاربر| Authenticated
GET| "/payments/all"| List all payments / فهرست همه پرداخت‌ها| Admin / Manager
GET| "/payments/:id"| Get a payment by ID / دریافت پرداخت با شناسه| Admin / Manager
GET| "/payments/userpay/:id"| Get a user's payments / فهرست پرداخت‌های یک کاربر| Admin / Manager
GET| "/payments/userpay/:userId/:paymentId"| Get a specific user payment / دریافت پرداخت مشخص کاربر| Admin / Manager

Project Structure | ساختار پروژه

text
.
├── server.js
└── src/
├── common/
│   ├── guard/
│   ├── middlewares/
│   └── utils/
├── config/
├── modules/
│   ├── address/
│   ├── auth/
│   ├── cart/
│   ├── categories/
│   ├── orders/
│   ├── payment/
│   ├── products/
│   └── users/
└── index.route.js


Each feature module contains its related model, controller, routes, service, validation, and message files where applicable.

هر ماژول، بسته به نیاز، فایل‌های مربوط به مدل، کنترلر، مسیرها، سرویس، اعتبارسنجی و پیام‌ها را در خود نگه می‌دارد.

Notes | نکات

- User registration requires email verification. | ثبت‌نام کاربران نیازمند تأیید ایمیل است.
- Uploaded images are stored in the project's public upload directory. | تصاویر آپلودشده در مسیر آپلود عمومی پروژه ذخیره می‌شوند.
- Order items store product details as a snapshot so later product changes do not rewrite historical order information. | اطلاعات محصولات سفارش به‌صورت Snapshot ذخیره می‌شود تا تغییرات بعدی محصول، اطلاعات سفارش‌های قبلی را تغییر ندهد.
- The payment result endpoint is simulated and must not be used as secure payment verification. | نتیجه پرداخت شبیه‌سازی‌شده است و نباید به‌عنوان تأیید امن پرداخت استفاده شود.
- Swagger documentation and live payment-gateway integration are not included in the current version. | مستندات Swagger و اتصال به درگاه پرداخت واقعی در نسخه فعلی وجود ندارند.

License | مجوز

This project is licensed under the ISC license, as declared in "package.json".

این پروژه مطابق فایل "package.json" تحت مجوز ISC منتشر شده است.