Requirements Spec.
===
```gherkin
Background:
    I am an administrator
```
```gherkin
Scenario Template: Archiving and Unarchiving Questions:
    q is a question existing in the DB
    archived is 'archived' or 'not archived'
    Given a question <q>
    And the question is <archived>
    When I toggle the archived bit
    Then the question should no longer be <archived>
    Examples:
        |q|archived|
```
```gherkin
Scenario Template: Merging Questions
    q1,q2,q3 are questions existing in the DB
    Given questions <q1>, <q2>, <q3>
    When I merge the questions
    Then the questions should all be archived
    And a new question with the text of <q1> should be created
    And that question should have the union of all parent votes
```
System Overview
===

Issues and bugs
===
Performance
===