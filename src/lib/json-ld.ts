/**
 * Safely serializes structured data for a JSON-LD <script> tag. Escaping
 * `<` prevents a `</script>` sequence inside any field value from breaking
 * out of the script tag (JSON.stringify alone does not escape it).
 *
 * Zero dependencies so it can be unit-tested directly with a plain test
 * runner.
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}
