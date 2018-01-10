# Gravirai.eu

Simple PWA online store based on serverless architecture.

Frontend Stack:
[Preact](https://github.com/developit/preact)
[Unistore](https://github.com/developit/unistore)

Serverless:
Firebase (Hosting, Functions, Firestore, Storage, Auth), MailGun, Braintree

TODO:

* all is done
* Remove item doesn't remove if from the store so order is placed with all products

Nice to have:

* Product administration
* Discounts for qtty
* Econt create shipping order
* Carousel in product page

Before go live:

* braintree account
* Add paypal in braintree
* Econt real account + Switch API
* MailGun + Domain [ done ]
* Transfer domain [ done ]
* Add security rulez to firestore [ done ]
* Configure GoogleAnalytics [ done ]
* Add admin users [ done ]

#How To:

* How to make a storage bucket public:
  https://cloud.google.com/storage/docs/access-control/making-data-public
