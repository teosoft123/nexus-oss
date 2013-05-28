package org.sonatype.nexus.restdoc;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.jaxrs.JavaApiListing;
import org.sonatype.sisu.siesta.common.Resource;

import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * ???
 *
 * @since 2.5
 */
@Named
@Path("/hello")
@Api("/hello")
@Produces(MediaType.APPLICATION_JSON)
public class HelloResource
    implements Resource
{
    @GET
    public String get(final @QueryParam("name") String name) {
        return "HELLO: " + name;
    }
}