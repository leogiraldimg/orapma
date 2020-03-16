Given /^I am on the home page$/ do
    visit root_path
end

When /^I fill in "([^\"]*)" with "([^\"]*)"$/ do |field, value|
    fill_in(field, :with => value)
end

When /^I select "([^\"]*)" in "([^\"]*)"$/ do |value, field|
    select value, :from => field
end

When /^I fill the locale fieldset$/ do
    steps %Q{
        When I select "011" in "originDDD"
        When I select "016" in "destinyDDD"
    }
end

When /^I click the (.*) button$/ do |button_name|
    find("#" + button_name).click
end

Then /^I should see the (.*) fieldset$/ do |fd_name|
    expect(page).to have_css("#fd-" + fd_name, visible: true)
end

When /^I fill the call fieldset$/ do
    steps %Q{
        When I fill in "callTime" with "20"
    }
end

When /^I fill the plans fieldset$/ do
    steps %Q{
        When I select "30" in "plan"
    }
end

Then /^I should see the results$/ do
    expect(page).to have_css("#div-content", visible: true)
end
  
When /^I fill the call fieldset incorrectly$/ do
    steps %Q{
        When I fill in "callTime" with "-1"
    }
end

Then /^I should not see the (.*) fieldset$/ do |fd_name|
    expect(page).to have_css("#fd-" + fd_name, visible: false)
end
  