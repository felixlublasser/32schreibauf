// This is a component that lets you pass in a string with slots. Have a look at this example:

// "Hey, you! #link{linkText: 'Click me, I\\'m a \"link\"!', url: 'https://something'} Thanks."

// This will produce three slots, a default one with slot-name 'text', one with slot name 'link',
// and another default slot with slot-name 'text'.

// The default slots will we passed an argument `text` through the slot scope which contains
// the text.

// For custom slots, the slot name is whatever is between the # pound sign and the { opening bracket.
// They are passed whatever is specified in the {curly brackets} in standard JS object format.

// You can choose to use simple single quotes ' instead of \" escaped double quotes in your
// JSON translation file. Also, single or double quotes around object keys are optional.
// Whitespace after the opening bracket { and before the closing curly bracket } as well as
// after commas , is allowed.

// If you want to include ' or " characters in your object value strings, it depends on if you're using
// single or double quotes around your values. If you're using single quotes, single quotes should be
// escaped \' and double quotes should be escaped as well \". If you're using double (escaped) quotes,
// single quotes will be just ' and double quotes will be \\" double escaped.

// This also works together with i18n's string interpolation feature!

// Example use with the same string from above:

<!-- <i18nInterpolator string="Hey, you! #link{text: 'Click me, I\\'m a \"link\"!', url: 'https://something'}">
  <a slot="link" slot-scope="{ linkText, url }" :href='url'>{{ linkText }}</a>
</i18nInterpolator> -->

// which will eventually render:

<!-- <span>
  Hey, you!
  <a href="https://something">Click me, I'm a "link"!</a>
  Thanks
</span> -->

<template>
  <span>
    <template v-for="fragment in fragments">
      <slot :name="fragment.name" v-bind="fragment">
        {{ fragment.text }}
      </slot>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    string: {
      type: String,
      required: true
    }
  },
  computed: {
    fragments () {
      const regex = /#[a-zA-Z]+\{[^}]*\}/g
      const text = this.string.split(regex)
      const placeholders = this.string.match(regex)
      return text.reduce((fragments, text, i) => {
        if (text) {
          fragments.push({ name: 'text', text })
        }
        if (placeholders && placeholders.length > i && placeholders[i]) {
          fragments.push({
            name: placeholders[i].match(/#([a-zA-Z]+)\{/)[1],
            ...JSON.parse(placeholders[i]
              .replace(/#[a-zA-Z]+{/, '{') // remove slot name
              .replace(/(^{|:|,)\s/g, (_, p1) => p1) // remove whitespace
              .replace(/\s}$/g, '}') // remove more whitespace
              .replace(/(^{|(?:[^\\]"|[^\\]'),)'?([^,:'"]+)'?:/g, (_, p1, p2) => `${p1}"${p2}":`) // force "" around keys
              .replace(/:'((?:[^']|\\')+)'(,"|}$)/g, (_, p1, p2) => { // force "" around single quoted values
                return `:"${p1.replace(/"/g, '\\"').replace(/\\'/g, "'")}"${p2}` // inside them, replace \' with ' and " with \"
              })
            )
          })
        }
        return fragments
      }, [])
    }
  }
}
</script>
