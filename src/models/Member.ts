import React from 'react'

export class MemberForm {
  constructor(
    public readonly name?: string,
    public readonly portrait?: string,
    public readonly description?: string,
    public readonly twitter?: string,
    public readonly instagram?: string,
    public readonly site?: string
  ) {}

  patch<K extends keyof MemberForm>(key: K, value: MemberForm[K]) {
    const { name, portrait, description, twitter, instagram, site } =
      Object.assign({}, this, { [key]: value })

    return new MemberForm(name, portrait, description, twitter, instagram, site)
  }

  check(): Partial<Record<keyof MemberForm, boolean>> {
    return {
      site: this.checksite(),
    }
  }

  private checksite() {
    const regex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    )

    return !this.site || this.site.search(regex) !== -1
  }

  flush() {
    return {
      name: this.name,
      portrait: this.portrait,
      description: this.description,
      twitter: this.twitter,
      instagram: this.instagram,
      site: this.site,
    }
  }
}

export class Member extends MemberForm {
  static readonly ANONYMOUS = new Member(
    '0x0000000000000000000000000000000000000000',
    -1
  )

  static bless(data: MemberJSON): Member {
    return new Member(data.address, data.id)
  }

  constructor(
    readonly address: string,
    readonly id: number
  ) {
    super()
  }

  get canonicalTwitter(): string | undefined {
    return canonical(this.twitter, 'https://www.twitter.com/')
  }

  get canonicalInstagram(): string | undefined {
    return canonical(this.instagram, 'https://www.instagram.com/')
  }

  get canonicalsite(): string | undefined {
    return canonical(this.site, '//')
  }

  get portraitAsCSSImage(): string {
    return this.portrait
      ? `url(${this.portrait})`
      : this.defaultPortraitAsCSSImage
  }

  get defaultPortraitAsCSSImage(): string {
    const defaultPortraits = [
      'linear-gradient(to right, #ffe033, #58dea0)',
      'linear-gradient(69deg, #74ebc6 3%, #d78dff 86%)',
      'linear-gradient(354deg, #0036e8 95%, #0f48e4 80%, #80d0c7 4%)',
      'linear-gradient(to right, #414ad0, #ffa2f4)',
      'linear-gradient(106deg, #ff994e 24%, #16e8a8 112%)',
      'linear-gradient(150deg, #00dbde 13%, #9a2eff 87%)',
      'linear-gradient(to right, #a9ebff, #ffb2ea)',
      'linear-gradient(139deg, #fa8bff 16%, #2cd1ff 60%, #2cff88)',
      'linear-gradient(to right, #fad961, #ff5acd)',
      'linear-gradient(51deg, #4158d0 11%, #c751c0 50%, #ffcb70 96%)',
    ]

    let r =
      this.address.split('').reduce((a, c) => a + c.charCodeAt(0), 0) %
      defaultPortraits.length
    if (r < 0) {
      r += defaultPortraits.length
    }

    return defaultPortraits[r]
  }

  get defaultPortrait(): React.CSSProperties {
    return { backgroundImage: this.defaultPortraitAsCSSImage }
  }
}

function canonical(
  url: string | undefined,
  prefix: string
): string | undefined {
  if (!url) {
    return undefined
  }
  if (url.match(/^https?:\/\//)) {
    return url
  }

  return prefix + url
}

export interface MemberJSON {
  readonly address: string
  readonly id: number
}
