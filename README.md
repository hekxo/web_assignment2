# ADDITIONAL API's SETUP INSTRUCTIONS:
# 'Rest Countries' and 'Quotable' API Documentation
This document provides comprehensive documentation for using the Rest Countries API and the Quotable API.

## Table of Contents
1. [Introduction](#introduction)
2. [Setup Instructions](#setup-instructions)
3. [Rest Countries API](#rest-countries-api)
    - [API Usage](#api-usage)
    - [Design Decisions](#design-decisions)
4. [Quotable API](#quotable-api)
    - [API Usage](#api-usage-1)
    - [Design Decisions](#design-decisions-1)
5. [Conclusion](#conclusion)

## <a name="introduction">Introduction
Both the Rest Countries API and the Quotable API provide valuable data for various applications. The Rest Countries API offers information about countries, including details like name, capital, population, languages, etc. On the other hand, the Quotable API provides a collection of quotes from famous individuals.

## <a name="setup-instructions">Setup Instructions
To use the APIs, follow these setup instructions:
1. **Obtain API Keys:** Some APIs require authentication via API keys. Make sure you obtain the necessary API keys for both Rest Countries API and Quotable API.
2. **Set Up Environment:** Store your API keys securely, either as environment variables or within your application configuration.

## <a name="rest-countries-api">Rest Countries API

### <a name="api-usage">API Usage
The Rest Countries API provides endpoints to fetch information about countries. Here's how you can use it:

1. **Retrieve Country Details:** Make a GET request to the endpoint `/name/{countryName}` to get details about a specific country. Replace `{countryName}` with the name of the country you're interested in.
2. **Filter by Region:** You can filter countries by region by making a GET request to `/region/{regionName}`.
3. **Search by Currency:** To find countries using a specific currency, send a GET request to `/currency/{currencyCode}`.
4. **Language Search:** If you want to find countries where a specific language is spoken, use `/lang/{languageCode}`.

### <a name="design-decisions">Design Decisions
- **RESTful Design:** The API follows RESTful principles, making it intuitive and easy to use.
- **Caching Mechanism:** Implementing a caching mechanism at the server-side reduces the load on the server and improves response times for frequently accessed data.
- **Versioning:** API versioning ensures backward compatibility and allows for future enhancements without breaking existing client applications.

## <a name="quotable-api">Quotable API

### <a name="api-usage-1">API Usage
The Quotable API offers endpoints to fetch quotes from famous individuals. Here's how you can use it:

1. **Retrieve Random Quote:** Make a GET request to the `/random` endpoint to get a random quote.
2. **Retrieve Quotes by Author:** Use the `/author/{authorName}` endpoint to fetch quotes by a specific author.
3. **Search Quotes:** The `/search/{query}` endpoint allows you to search for quotes containing a specific keyword or phrase.

### <a name="design-decisions-1">Design Decisions
- **Simple Endpoint Structure:** The API has a straightforward endpoint structure, making it easy to understand and use.
- **Rate Limiting:** Implementing rate limiting prevents abuse of the API and ensures fair usage for all consumers.

## <a name="conclusion">Conclusion
The Rest Countries API and Quotable API offer valuable data for various applications, from geographical information to inspirational quotes. By following the setup instructions and understanding the API usage details provided in this document, developers can effectively integrate these APIs into their projects.

