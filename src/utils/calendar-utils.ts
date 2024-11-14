import ICAL from 'ical.js';
import { DateTime } from 'luxon';
import { PrayerDetail } from '../types/prayer-types';

export function createCalendarEvent(
  prayer: string,
  startTime: DateTime,
  duration: number,
  prayerDetail: PrayerDetail,
): ICAL.Component {
  const endTime = startTime.plus({ minutes: duration });
  const event = new ICAL.Component('vevent');

  event.addPropertyWithValue('UID', `${prayer}_${startTime.toISODate()}`);
  event.addPropertyWithValue('SUMMARY', prayerDetail.name);
  event.addPropertyWithValue(
    'DTSTAMP',
    new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
  );
  event.addPropertyWithValue(
    'DTSTART',
    startTime.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'"),
  );
  event.addPropertyWithValue(
    'DTEND',
    endTime.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'"),
  );

  const description = `${prayerDetail.name}\\n${prayerDetail.hadith}`;
  event.addPropertyWithValue('DESCRIPTION', description);
  event.addPropertyWithValue('X-ALT-DESC', description);

  event.addPropertyWithValue('X-MICROSOFT-CDO-BUSYSTATUS', 'BUSY');
  event.addPropertyWithValue('CLASS', 'PUBLIC');
  event.addPropertyWithValue('TRANSP', 'OPAQUE');

  return event;
}
