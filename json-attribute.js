(function () {
  htmx.defineExtension("json-attr", {  
    onEvent: function(name, evt) {
      if (name === "htmx:configRequest") {
        delete evt.detail.headers['HX-Current-URL']
        delete evt.detail.headers['HX-Request']
        delete evt.detail.headers['HX-Trigger']
        delete evt.detail.headers['HX-Trigger-Name']
        delete evt.detail.headers['HX-Target']
        evt.detail.headers["Content-Type"] = "application/json"
      }
    },
    encodeParameters: function(xhr, parameters, elt) {
      xhr.overrideMimeType("text/json")
      const json = elt.attributes['hx-json'].value.replace(/\s/g, "")
      return json
    }
  })
})()