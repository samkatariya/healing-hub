import { describe, expect, test } from 'bun:test';
import { articleNextStep, relatedReflections, readingMinutes } from './journal';
import { contact, hospitalLocations } from './site-data';

const current = { id: '1', slug: 'child-adhd', title: 'Understanding child ADHD', category_id: 'child' };
describe('Journal engagement rules', () => {
  test('child ADHD points into child booking', () => {
    expect(articleNextStep(current).who).toBe('My Child');
  });
  test('burnout points into adult booking', () => {
    expect(articleNextStep({ id: '2', slug: 'burnout', title: 'Burnout' }).who).toBe('Myself');
  });
  test('related reflections exclude the current post and prioritise its category', () => {
    const result = relatedReflections(current, [current, { id: '2', slug: 'other', title: 'Other', category_id: 'adult' }, { id: '3', slug: 'child-care', title: 'Child care', category_id: 'child' }, { id: '4', slug: 'more', title: 'More' }, { id: '5', slug: 'last', title: 'Last' }]);
    expect(result.map(a => a.slug)).toEqual(['child-care', 'other', 'more']);
  });
  test('reading minutes preserve the published estimate', () => {
    expect(readingMinutes({ ...current, reading_minutes: 7 })).toBe(7);
  });
  test('the sole call and WhatsApp number is 9168611716', () => {
    expect(contact.phone).toBe('+919168611716');
    expect(contact.phoneDisplay).toBe('+91 91686 11716');
    expect(new URL(contact.whatsapp).pathname).toBe('/919168611716');
    expect(hospitalLocations.every(h => h.phone === '+91 91686 11716')).toBe(true);
  });
});