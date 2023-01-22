import { Moment } from 'moment';

export function insertCommas(number_string: string) {
  const s = number_string.split('.');
  s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return s.join('.');
}

export function humanNumber(total: number) {
  if (total < 100) {
    return total;
  }

  return insertCommas((total / 1000).toFixed(1)) + 'K';
}

function removeZeros(number_string: string) {
  const s = number_string.split('.');
  if (s.length === 2) {
    s[1] = s[1].replace(/0*$/, '');
    if (!s[1]) {
      s.pop();
    }
  }

  return s.join('.');
}

function formatPositive2(value: number) {
  if (value < 100) {
    return removeZeros(value.toPrecision(2));
  }

  return insertCommas(value.toFixed(0));
}

export function formatPositive(value: number) {
  if (value <= 0) {
    throw new Error(`${value} is zero or negative.`);
  }
  if (value < 0.01) {
    return '< 0.01';
  }

  return formatPositive2(value);
}

export function formatChange(change: number) {
  if (-1e-4 < change && change < 1e-4) {
    return '0%';
  }

  return (
    (change > 0 ? '+' : '-') + formatPositive2(Math.abs(change * 1e2)) + '%'
  );
}

export function formatPercentage(change: number) {
  if (-1e-4 < change && change < 1e-4) {
    return '0%';
  }

  return formatPositive2(Math.abs(change * 1e2)) + '%';
}

export function shortHash(address: string) {
  if (address.length > 12) {
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
  }
  return address;
}

export function shortEmail(email: string) {
  const temp = email.split('@');
  if (temp.length !== 2) {
    return email;
  }
  if (temp[0].length > 6) {
    return `${temp[0].slice(0, 3)}...${temp[0].slice(-3)}@${temp[1]}`;
  }
  if (temp[0].length > 2) {
    return `${temp[0].slice(0, 1)}...${temp[0].slice(-1)}@${temp[1]}`;
  }
  return email;
}

export function isValid(s: any) {
  return s !== undefined && s !== null && s !== '';
}

export function numberFormat(s: number, decimal?: number) {
  let reg = /(?=\B(\d{3})+$)/g;
  return s.toFixed(decimal).replace(reg, ',');
}

export function gmtTime(a: Moment) {
  return [
    a.format('YYYY-MM-DD HH:mm:ss'),
    ' GMT',
    a.format('Z').split(':')[0],
  ].join('');
}

export interface ImportStsJSON {
  total: number;
  valid: number;
  invalid: number;
  rootHash: string;
  id: number;
}
