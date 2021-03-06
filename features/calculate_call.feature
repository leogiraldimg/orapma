Feature: Calculate the call's prices

As a user
I want to fill the form
So that I can know the call's prices

Scenario: User fills all fields with valid data
    Given I am on the home page
    When I fill the locale fieldset
    And I click the avancar-to-ligacao button
    Then I should see the call fieldset
    When I fill the call fieldset
    And I click the avancar-to-planos button
    Then I should see the plans fieldset
    When I fill the plans fieldset
    And I click the advance-to-result button
    Then I should see the results

Scenario: User fills call field with negative value
    Given I am on the home page
    When I fill the locale fieldset
    And I click the avancar-to-ligacao button
    Then I should see the call fieldset
    When I fill the call fieldset incorrectly
    And I click the avancar-to-planos button
    Then I should not see the plans fieldset

Scenario: User doesn't fill call field
    Given I am on the home page
    When I fill the locale fieldset
    And I click the avancar-to-ligacao button
    Then I should see the call fieldset
    And I click the avancar-to-planos button
    Then I should not see the plans fieldset

Scenario: User fills all fields with valid data and returns to begin
    Given I am on the home page
    When I fill the locale fieldset
    And I click the avancar-to-ligacao button
    Then I should see the call fieldset
    When I fill the call fieldset
    And I click the avancar-to-planos button
    Then I should see the plans fieldset
    When I fill the plans fieldset
    And I click the advance-to-result button
    Then I should see the results
    When I click the reset button
    Then I should see the locale fieldset