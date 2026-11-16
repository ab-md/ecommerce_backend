::: {align="center"}
# E-Commerce Backend API

A RESTful backend for an e-commerce application, built with **Node.js**,
**Express 5**, and **MongoDB**.

[English](#english) · [فارسی](#فارسی)
:::

------------------------------------------------------------------------

# English

## Overview

A modular e-commerce REST API built with Node.js, Express, and MongoDB.
It covers core online-store workflows, including authentication, catalog
management, shopping carts, orders, and payments. The project focuses on
clear module boundaries, validation, authentication, authorization, and
maintainable business logic.

## Features

-   **Authentication:** User registration, email verification, JWT
    authentication with HTTP-only cookies, and password changes that
    invalidate previous sessions.
-   **User management:** Profile retrieval and updates, avatar uploads,
    and admin/manager user-management endpoints.
-   **Address management:** Create, update, retrieve, and delete
    addresses, with admin/manager access to user addresses.
-   **Catalog management:** Category and product CRUD, public endpoints
    for active catalog items, and product image/gallery uploads.
-   **Shopping cart:** Add products, decrease quantities, remove items,
    and retrieve the current user's cart.
-   **Orders:** Create and retrieve orders, cancel pending orders,
    admin/manager order management, and product snapshots in order
    items.
-   **Payments:** Create payment records, submit simulated payment
    results, and retrieve user and administrative payment records.
-   **Validation and security:** Zod request validation, centralized
    error handling, authentication and role-based authorization
    middleware, and rate limiting (100 requests per IP in a 15-minute
    window).

## Tech Stack

  Technology           Purpose
  -------------------- -----------------------
  Node.js              JavaScript runtime
  Express 5            Web framework
  MongoDB              Database
  Mongoose             ODM
  Zod                  Request validation
  JSON Web Token       Authentication
  bcrypt               Password hashing
  Multer               File uploads
  Nodemailer           Email verification
  express-rate-limit   Request rate limiting

## Getting Started

### Requirements

-   Node.js
-   npm
-   MongoDB database
-   Gmail account with an App Password (for email verification)

### Installation

``` bash
git clone https://github.com/ab-md/ecommerce_backend.git
cd ecommerce_backend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

``` env
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

Do not commit your `.env` file or expose your credentials.

### Run the Project

Development:

``` bash
npm run dev
```

Production:

``` bash
npm start
```

The server starts on the port specified by `PORT`.

## Initial Admin Setup

Registration creates a regular user. To access administrative endpoints:

1.  Register through `POST /auth/register`.
2.  Complete email verification.
3.  Open the MongoDB `users` collection.
4.  Find your user document and change its `role` field to
    **`"admin"`**.

Example using MongoDB Shell:

``` javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
);
```

Use the exact lowercase value `admin`; role comparisons are
case-sensitive. The project also supports the `manager` role for
endpoints available to both administrators and managers.

## API Reference

All routes are mounted at the application root. For example,
registration is available at `POST /auth/register`.

**Access levels**

-   **Public:** No authentication required
-   **Authenticated:** Requires a valid login session
-   **Admin / Manager:** Requires the `admin` or `manager` role
-   **Admin:** Requires the `admin` role

### Authentication --- `/auth`

  --------------------------------------------------------------------------
  Method            Endpoint             Description       Access
  ----------------- -------------------- ----------------- -----------------
  POST              `/auth/register`     Register a user   Public

  POST              `/auth/send-code`    Request an email  Public
                                         verification code 

  POST              `/auth/check-code`   Verify the email  Public
                                         address           

  POST              `/auth/login`        Log in            Public
  --------------------------------------------------------------------------

### Users --- `/users`

  Method   Endpoint               Description                    Access
  -------- ---------------------- ------------------------------ -----------------
  GET      `/users/`              List users                     Admin / Manager
  GET      `/users/me`            Get current user's profile     Authenticated
  GET      `/users/info/:id`      Get a user by ID               Admin / Manager
  PATCH    `/users/me`            Update profile and/or avatar   Authenticated
  PATCH    `/users/me/password`   Change password                Authenticated

### Addresses --- `/users/address`

  ------------------------------------------------------------------------------------------------
  Method            Endpoint                                   Description       Access
  ----------------- ------------------------------------------ ----------------- -----------------
  POST              `/users/address/`                          Create an address Authenticated

  GET               `/users/address/`                          List current      Authenticated
                                                               user's addresses  

  GET               `/users/address/:id`                       Get an address    Authenticated

  PUT               `/users/address/:id`                       Update an address Authenticated

  DELETE            `/users/address/:id`                       Delete an address Authenticated

  GET               `/users/address/protected/all`             List all          Admin / Manager
                                                               addresses         

  GET               `/users/address/protected/:id`             Get an address by Admin / Manager
                                                               ID                

  GET               `/users/address/user/:id`                  List a specific   Admin / Manager
                                                               user's addresses  

  GET               `/users/address/user/:userId/:addressId`   Get a specific    Admin / Manager
                                                               user's address    
  ------------------------------------------------------------------------------------------------

### Categories --- `/categories`

  Method   Endpoint                     Description              Access
  -------- ---------------------------- ------------------------ -----------------
  GET      `/categories/active`         List active categories   Public
  GET      `/categories/active/:slug`   Get an active category   Public
  GET      `/categories/all`            List all categories      Admin / Manager
  GET      `/categories/:slug`          Get a category by slug   Admin / Manager
  POST     `/categories/`               Create a category        Admin / Manager
  PUT      `/categories/:slug`          Update a category        Admin / Manager
  DELETE   `/categories/:slug`          Delete a category        Admin

### Products --- `/products`

  Method   Endpoint                   Description             Access
  -------- -------------------------- ----------------------- -----------------
  GET      `/products/active`         List active products    Public
  GET      `/products/active/:slug`   Get an active product   Public
  GET      `/products/all`            List all products       Admin / Manager
  GET      `/products/:slug`          Get a product by slug   Admin / Manager
  POST     `/products/`               Create a product        Admin / Manager
  PUT      `/products/:slug`          Update a product        Admin / Manager
  DELETE   `/products/:slug`          Delete a product        Admin

### Cart --- `/cart`

  ---------------------------------------------------------------------------
  Method            Endpoint              Description       Access
  ----------------- --------------------- ----------------- -----------------
  POST              `/cart/add`           Add a product to  Authenticated
                                          the cart          

  PATCH             `/cart/remove`        Decrease a        Authenticated
                                          product quantity  

  PATCH             `/cart/remove-item`   Remove a product  Authenticated
                                          from the cart     

  GET               `/cart/`              Get current       Authenticated
                                          user's cart       

  GET               `/cart/all`           List all carts    Admin / Manager

  GET               `/cart/user/:id`      Get a user's cart Admin / Manager
  ---------------------------------------------------------------------------

### Orders --- `/orders`

  ---------------------------------------------------------------------------------------
  Method            Endpoint                          Description       Access
  ----------------- --------------------------------- ----------------- -----------------
  POST              `/orders/`                        Create an order   Authenticated

  GET               `/orders/`                        List current      Authenticated
                                                      user's orders     

  GET               `/orders/:id`                     Get one of the    Authenticated
                                                      current user's    
                                                      orders            

  PATCH             `/orders/:id/cancel`              Cancel a pending  Authenticated
                                                      order             

  PATCH             `/orders/:id`                     Update order      Admin / Manager
                                                      status            

  GET               `/orders/all`                     List all orders   Admin / Manager

  GET               `/orders/all/:id`                 Get an order by   Admin / Manager
                                                      ID                

  GET               `/orders/user/:userId`            List a user's     Admin / Manager
                                                      orders            

  GET               `/orders/user/:userId/:orderId`   Get a specific    Admin / Manager
                                                      user's order      
  ---------------------------------------------------------------------------------------

### Payments --- `/payments`

  ----------------------------------------------------------------------------------------------
  Method            Endpoint                                 Description       Access
  ----------------- ---------------------------------------- ----------------- -----------------
  POST              `/payments/create`                       Create a payment  Authenticated
                                                             record            

  POST              `/payments/pay`                          Submit a          Authenticated
                                                             simulated payment 
                                                             result            

  GET               `/payments/user`                         List current      Authenticated
                                                             user's payments   

  GET               `/payments/user/:id`                     Get one of the    Authenticated
                                                             current user's    
                                                             payments          

  GET               `/payments/all`                          List all payments Admin / Manager

  GET               `/payments/:id`                          Get a payment by  Admin / Manager
                                                             ID                

  GET               `/payments/userpay/:id`                  List a specific   Admin / Manager
                                                             user's payments   

  GET               `/payments/userpay/:userId/:paymentId`   Get a specific    Admin / Manager
                                                             user's payment    
  ----------------------------------------------------------------------------------------------

## Project Structure

``` text
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
```

Each feature module groups related files, such as routes, controllers,
services, models, validation schemas, and messages where applicable.

## Notes

-   User registration requires email verification.
-   Uploaded images are stored in the project's public upload directory.
-   Order items store product details as snapshots, preserving
    historical order information if product data changes later.
-   **Payments are simulated in this version.** The `/payments/pay`
    endpoint is not a secure payment verification mechanism and must not
    be used as one.
-   The current rate limiter allows up to 100 requests per IP within 15
    minutes. This is a basic application-level limit, not a replacement
    for production infrastructure-level protection.
-   A live payment gateway integration and Swagger documentation are not
    included.

## License

This project is licensed under the [ISC
License](https://opensource.org/license/isc-license-txt/).

------------------------------------------------------------------------

# فارسی

## معرفی پروژه

این پروژه یک REST API برای فروشگاه اینترنتی است که با Node.js، Express و
MongoDB توسعه داده شده است. امکانات اصلی یک فروشگاه آنلاین، از جمله
احراز هویت کاربران، مدیریت محصولات و دسته‌بندی‌ها، سبد خرید، سفارش‌ها و
پرداخت‌ها در آن پیاده‌سازی شده‌اند.

ساختار پروژه به‌صورت ماژولار طراحی شده و تمرکز آن بر جداسازی مسئولیت‌ها،
اعتبارسنجی ورودی‌ها، احراز هویت، سطح دسترسی و مدیریت منطق برنامه است.

## امکانات

-   **احراز هویت:** ثبت‌نام و تأیید ایمیل، ورود با JWT و کوکی HTTP-only،
    تغییر رمز عبور و بی‌اعتبار کردن نشست‌های قبلی.
-   **مدیریت کاربران:** مشاهده و ویرایش پروفایل، آپلود تصویر پروفایل و
    مسیرهای مدیریتی برای مدیر و مدیر میانی.
-   **مدیریت آدرس‌ها:** ثبت، ویرایش، مشاهده و حذف آدرس و دسترسی مدیر و
    مدیر میانی به آدرس کاربران.
-   **مدیریت محصولات و دسته‌بندی‌ها:** عملیات CRUD، دسترسی عمومی به
    محصولات و دسته‌بندی‌های فعال و آپلود تصویر اصلی و گالری محصولات.
-   **سبد خرید:** افزودن محصول، کاهش تعداد، حذف محصول و مشاهده سبد خرید
    کاربر.
-   **سفارش‌ها:** ثبت و مشاهده سفارش، لغو سفارش در انتظار، مدیریت سفارش‌ها
    و ذخیره اطلاعات محصول به‌صورت Snapshot.
-   **پرداخت‌ها:** ایجاد رکورد پرداخت، ثبت نتیجه پرداخت شبیه‌سازی‌شده و
    مشاهده پرداخت‌های کاربر و بخش مدیریتی.
-   **اعتبارسنجی و امنیت:** اعتبارسنجی درخواست‌ها با Zod، مدیریت متمرکز
    خطا، Middlewareهای احراز هویت و کنترل سطح دسترسی و محدودسازی تعداد
    درخواست‌ها (۱۰۰ درخواست برای هر IP در بازه ۱۵ دقیقه‌ای).

## تکنولوژی‌ها

  تکنولوژی             کاربرد
  -------------------- ---------------------------
  Node.js              محیط اجرای JavaScript
  Express 5            فریم‌ورک سمت سرور
  MongoDB              پایگاه داده
  Mongoose             ارتباط با پایگاه داده
  Zod                  اعتبارسنجی داده‌ها
  JWT                  احراز هویت
  bcrypt               هش کردن رمز عبور
  Multer               آپلود فایل
  Nodemailer           ارسال ایمیل تأیید
  express-rate-limit   محدودسازی تعداد درخواست‌ها

## راه‌اندازی پروژه

### پیش‌نیازها

-   Node.js
-   npm
-   پایگاه داده MongoDB
-   حساب Gmail به همراه App Password برای ارسال ایمیل تأیید

### نصب

``` bash
git clone https://github.com/ab-md/ecommerce_backend.git
cd ecommerce_backend
npm install
```

### متغیرهای محیطی

در ریشه پروژه یک فایل `.env` بسازید:

``` env
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

اطلاعات محرمانه را در فایل `.env` نگه دارید و این فایل را در Git قرار
ندهید.

### اجرای پروژه

حالت توسعه:

``` bash
npm run dev
```

حالت اجرا:

``` bash
npm start
```

سرور روی پورتی اجرا می‌شود که در متغیر `PORT` مشخص کرده‌اید.

## تنظیم دسترسی مدیر (Admin)

پس از ثبت‌نام، حساب کاربر به‌صورت عادی ساخته می‌شود. برای دسترسی به مسیرهای
مدیریتی:

1.  از طریق `POST /auth/register` ثبت‌نام کنید.
2.  ایمیل حساب را تأیید کنید.
3.  وارد کالکشن `users` در MongoDB شوید.
4.  سند مربوط به حساب خود را پیدا کنید و مقدار فیلد `role` را به
    **`"admin"`** تغییر دهید.

نمونه دستور در MongoDB Shell:

``` javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
);
```

مقدار نقش باید دقیقاً `admin` و با حروف کوچک باشد؛ مقایسه نقش‌ها به حروف
بزرگ و کوچک حساس است. نقش `manager` نیز برای مسیرهایی که مدیر و مدیر
میانی را می‌پذیرند، پشتیبانی می‌شود.

## مستندات API

تمام مسیرها مستقیماً از ریشه برنامه در دسترس هستند. برای مثال، مسیر
ثبت‌نام `POST /auth/register` است.

**سطوح دسترسی**

-   **Public:** بدون نیاز به ورود
-   **Authenticated:** نیازمند ورود و توکن معتبر
-   **Admin / Manager:** نیازمند نقش `admin` یا `manager`
-   **Admin:** فقط نقش `admin`

### احراز هویت --- `/auth`

  متد    مسیر                 توضیحات                  دسترسی
  ------ -------------------- ------------------------ --------
  POST   `/auth/register`     ثبت‌نام کاربر             عمومی
  POST   `/auth/send-code`    درخواست کد تأیید ایمیل   عمومی
  POST   `/auth/check-code`   تأیید ایمیل              عمومی
  POST   `/auth/login`        ورود کاربر               عمومی

### کاربران --- `/users`

  ----------------------------------------------------------------------------
  متد               مسیر                   توضیحات           دسترسی
  ----------------- ---------------------- ----------------- -----------------
  GET               `/users/`              دریافت فهرست      مدیر / مدیر میانی
                                           کاربران           

  GET               `/users/me`            دریافت پروفایل    کاربر واردشده
                                           کاربر فعلی        

  GET               `/users/info/:id`      دریافت اطلاعات    مدیر / مدیر میانی
                                           کاربر با شناسه    

  PATCH             `/users/me`            ویرایش پروفایل و  کاربر واردشده
                                           تصویر کاربر       

  PATCH             `/users/me/password`   تغییر رمز عبور    کاربر واردشده
  ----------------------------------------------------------------------------

### آدرس‌ها --- `/users/address`

  ------------------------------------------------------------------------------------------------
  متد               مسیر                                       توضیحات           دسترسی
  ----------------- ------------------------------------------ ----------------- -----------------
  POST              `/users/address/`                          ثبت آدرس          کاربر واردشده

  GET               `/users/address/`                          دریافت آدرس‌های    کاربر واردشده
                                                               کاربر فعلی        

  GET               `/users/address/:id`                       دریافت یک آدرس    کاربر واردشده

  PUT               `/users/address/:id`                       ویرایش آدرس       کاربر واردشده

  DELETE            `/users/address/:id`                       حذف آدرس          کاربر واردشده

  GET               `/users/address/protected/all`             دریافت همه آدرس‌ها مدیر / مدیر میانی

  GET               `/users/address/protected/:id`             دریافت آدرس با    مدیر / مدیر میانی
                                                               شناسه             

  GET               `/users/address/user/:id`                  دریافت آدرس‌های یک مدیر / مدیر میانی
                                                               کاربر             

  GET               `/users/address/user/:userId/:addressId`   دریافت آدرس مشخص  مدیر / مدیر میانی
                                                               یک کاربر          
  ------------------------------------------------------------------------------------------------

### دسته‌بندی‌ها --- `/categories`

  ----------------------------------------------------------------------------------
  متد               مسیر                         توضیحات           دسترسی
  ----------------- ---------------------------- ----------------- -----------------
  GET               `/categories/active`         دریافت            عمومی
                                                 دسته‌بندی‌های فعال  

  GET               `/categories/active/:slug`   دریافت دسته‌بندی   عمومی
                                                 فعال              

  GET               `/categories/all`            دریافت همه        مدیر / مدیر میانی
                                                 دسته‌بندی‌ها        

  GET               `/categories/:slug`          دریافت دسته‌بندی   مدیر / مدیر میانی
                                                 با اسلاگ          

  POST              `/categories/`               ایجاد دسته‌بندی    مدیر / مدیر میانی

  PUT               `/categories/:slug`          ویرایش دسته‌بندی   مدیر / مدیر میانی

  DELETE            `/categories/:slug`          حذف دسته‌بندی      مدیر
  ----------------------------------------------------------------------------------

### محصولات --- `/products`

  متد      مسیر                       توضیحات                 دسترسی
  -------- -------------------------- ----------------------- -------------------
  GET      `/products/active`         دریافت محصولات فعال     عمومی
  GET      `/products/active/:slug`   دریافت محصول فعال       عمومی
  GET      `/products/all`            دریافت همه محصولات      مدیر / مدیر میانی
  GET      `/products/:slug`          دریافت محصول با اسلاگ   مدیر / مدیر میانی
  POST     `/products/`               ایجاد محصول             مدیر / مدیر میانی
  PUT      `/products/:slug`          ویرایش محصول            مدیر / مدیر میانی
  DELETE   `/products/:slug`          حذف محصول               مدیر

### سبد خرید --- `/cart`

  ---------------------------------------------------------------------------
  متد               مسیر                  توضیحات           دسترسی
  ----------------- --------------------- ----------------- -----------------
  POST              `/cart/add`           افزودن محصول به   کاربر واردشده
                                          سبد خرید          

  PATCH             `/cart/remove`        کاهش تعداد محصول  کاربر واردشده

  PATCH             `/cart/remove-item`   حذف محصول از سبد  کاربر واردشده
                                          خرید              

  GET               `/cart/`              دریافت سبد خرید   کاربر واردشده
                                          کاربر فعلی        

  GET               `/cart/all`           دریافت همه سبدهای مدیر / مدیر میانی
                                          خرید              

  GET               `/cart/user/:id`      دریافت سبد خرید   مدیر / مدیر میانی
                                          یک کاربر          
  ---------------------------------------------------------------------------

### سفارش‌ها --- `/orders`

  ---------------------------------------------------------------------------------------
  متد               مسیر                              توضیحات           دسترسی
  ----------------- --------------------------------- ----------------- -----------------
  POST              `/orders/`                        ثبت سفارش         کاربر واردشده

  GET               `/orders/`                        دریافت سفارش‌های   کاربر واردشده
                                                      کاربر فعلی        

  GET               `/orders/:id`                     دریافت یکی از     کاربر واردشده
                                                      سفارش‌های کاربر    

  PATCH             `/orders/:id/cancel`              لغو سفارش در      کاربر واردشده
                                                      انتظار            

  PATCH             `/orders/:id`                     تغییر وضعیت سفارش مدیر / مدیر میانی

  GET               `/orders/all`                     دریافت همه        مدیر / مدیر میانی
                                                      سفارش‌ها           

  GET               `/orders/all/:id`                 دریافت سفارش با   مدیر / مدیر میانی
                                                      شناسه             

  GET               `/orders/user/:userId`            دریافت سفارش‌های   مدیر / مدیر میانی
                                                      یک کاربر          

  GET               `/orders/user/:userId/:orderId`   دریافت سفارش مشخص مدیر / مدیر میانی
                                                      یک کاربر          
  ---------------------------------------------------------------------------------------

### پرداخت‌ها --- `/payments`

  ----------------------------------------------------------------------------------------------
  متد               مسیر                                     توضیحات           دسترسی
  ----------------- ---------------------------------------- ----------------- -----------------
  POST              `/payments/create`                       ایجاد رکورد       کاربر واردشده
                                                             پرداخت            

  POST              `/payments/pay`                          ثبت نتیجه پرداخت  کاربر واردشده
                                                             شبیه‌سازی‌شده       

  GET               `/payments/user`                         دریافت پرداخت‌های  کاربر واردشده
                                                             کاربر فعلی        

  GET               `/payments/user/:id`                     دریافت یک پرداخت  کاربر واردشده
                                                             متعلق به کاربر    
                                                             فعلی              

  GET               `/payments/all`                          دریافت همه        مدیر / مدیر میانی
                                                             پرداخت‌ها          

  GET               `/payments/:id`                          دریافت پرداخت با  مدیر / مدیر میانی
                                                             شناسه             

  GET               `/payments/userpay/:id`                  دریافت پرداخت‌های  مدیر / مدیر میانی
                                                             یک کاربر          

  GET               `/payments/userpay/:userId/:paymentId`   دریافت پرداخت     مدیر / مدیر میانی
                                                             مشخص یک کاربر     
  ----------------------------------------------------------------------------------------------

## ساختار پروژه

``` text
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
```

هر ماژول، متناسب با نیاز خود، فایل‌های مرتبط با Route، Controller،
Service، Model، Validation و Message را در کنار هم نگه می‌دارد.

## نکات

-   ثبت‌نام کاربران نیازمند تأیید ایمیل است.
-   تصاویر آپلودشده در پوشه عمومی آپلود پروژه ذخیره می‌شوند.
-   اطلاعات محصولات در سفارش به‌صورت Snapshot ذخیره می‌شود تا تغییرات بعدی
    محصول، اطلاعات سفارش‌های قبلی را تغییر ندهد.
-   **پرداخت‌ها در این نسخه شبیه‌سازی شده‌اند.** مسیر `/payments/pay`
    سازوکار امنی برای تأیید پرداخت نیست و نباید به‌عنوان تأیید واقعی
    پرداخت استفاده شود.
-   محدودکننده درخواست در وضعیت فعلی، حداکثر ۱۰۰ درخواست از هر IP را در
    بازه ۱۵ دقیقه‌ای مجاز می‌داند. این محدودیت پایه‌ای در سطح برنامه است و
    جایگزین لایه‌های حفاظتی زیرساخت در محیط عملیاتی نیست.
-   اتصال به درگاه پرداخت واقعی و مستندات Swagger در این نسخه وجود
    ندارند.

## مجوز

این پروژه تحت مجوز [ISC
License](https://opensource.org/license/isc-license-txt/) منتشر شده است.

------------------------------------------------------------------------
