---
title: Metrics
description: An overview of the Metrics area in Dino — the reference data types used to classify and link form submissions and reports.
---

# Metrics

Metrics are the reference data categories used across Dino to classify, organize, and filter your collected data. Metrics can be associated to collected forms and then used to define views on the data of your installation. For example metrics can be used to define user permissions: a given user can be granted access to only some specific values of metrics. This can be useful for example in a multicountry organization, if you want to limit certain users to access only data of the country where they operate. Similarly, you can limit the access of Dino users following other criteria using other metrics, like the metric project, to limit access to only some projects, or the metric organization, to limit access only to some partner's data. 

Besides being used to limit access to data, metrics can also be used to facilitate filters and aggregations. For example I might want to count how many forms have been collected for a given country. In this case I can filter my form data based on the value of the metric location. Filters can also benefit from the hierarchical stracture of metrics. For example if I have a location structure in, let's say, three levels, because I map provinces (i.e. a matric value for each province), grouped in regions (i.e. a metric value for each region, which is used also as parents for the provinces), grouped in countries (i.e. a metric value for each country, which is used as a parent for the regions). So, in this case I could filter all forms of a given region by simply filtering the region, thereby selecting all provinces that share the same region. 

This mechanism can also be used when generating reports. A report data of a given report schema can be generated using a particular value of a metric. This will imply that the report schema is applied to all forms that have the same metric value, following a hierarchy of metric values. 

Finally, metrics can be used to link different form data. For example I can have a form for the personal data of beneficiaries - one per person - and then another form for their medical visits - more than one per person. The metric case can be used to link the personal data form to the visit forms and also to copy some of the data of the personal form, like the date of birth, to the medical visit forms. 

The different ways of using metrics, make this entity a powerful tool to manage data. 

The Metrics section is where you manage the lists of available values for each category. It serves as the central hub for all your reference data.

![Main view of the Metrics page](../imgs/metrics/index.png)

---

## Metric Types

The main page displays the metric types that are active in your Dino installation. Each type is shown as a card with an icon and label. Click on any card to open its management page.

Depending on your system configuration, some or all of the following metric types may be available:

| Metric Type | Description |
|---|---|
| **Thematic Areas** | Areas of work or thematic groupings for your activities. |
| **Cases** | Individual cases, people, or beneficiaries tracked across form submissions. |
| **Locations** | Geographic locations where data is collected or activities occur. |
| **Projects** | Projects that form submissions and reports are linked to. |
| **Organizations** | Organizations involved in or responsible for activities. |

!!! tip "Accessing Metrics"
    You can navigate to the Metrics area by clicking **Metrics** in the main application menu.

---

## What You Can Do

From the main Metrics page, you can:

1.  **View all active metric types** available for your data.
2.  **Navigate to a specific metric type** by clicking its card. This takes you to a dedicated page where you can manage the list of values for that type (e.g., add a new location or edit a project name).
3.  **Use breadcrumbs** at the top of the page to track your navigation path within the Metrics section.

For detailed instructions on adding, editing, or deleting values within a specific metric type, see the documentation for each metric type: 

- [Areas](areas.md)
- [Cases](cases.md)
- [Locations](locations.md)
- [Organizations](organizations.md)
- [Projects](projects.md).
---

## Navigating the Metrics Section

1.  On the main Metrics page, review the cards for each available metric type.
2.  Click the card for the metric type you want to manage (e.g., **Locations**).
3.  You will be taken to a dedicated page for that metric type, where you can view, add, edit, or delete specific values.
4.  Use the breadcrumb trail at the top of the page to easily navigate back to the main Metrics page or to other sections.

!!! warning "System Configuration"
    The available metric types are configured by your system administrator. If you do not see a specific metric type you need, contact your administrator.

!!! warning "Deleting a metric value"
    This holds for all metrics. Deleting a metric value, for example a given location or a case, may affect forms that reference it. This is why before deleting a metric value, the system checks whether there is any element in Dino associate to that value. If there is a form data, or a report data or any reference within the permissions, deleting that value will not be allowed. Ensure no active records rely on a metric value before removing it.